import asyncio
import json
import random
import re
import datetime
import ollama
from playwright.async_api import async_playwright

# Configuration
MODEL_NAME = 'qwen2-vl'
TARGET_TASKS_PER_HOUR = 20
AVERAGE_SECONDS_PER_TASK = 3600 / TARGET_TASKS_PER_HOUR  # ~180 seconds

async def run_autonomous_worker():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        
        print("Waiting 45 seconds for you to log in to Prism and start the first task...")
        await asyncio.sleep(45)

        tasks_completed = 0

        while True:
            start_time = datetime.datetime.now()
            print(f"\n[{start_time.strftime('%H:%M:%S')}] Starting Task #{tasks_completed + 1}...")

            try:
                # 1. UI SELECTORS (Update these based on the Prism tool)
                input_selector = ".input-image-container"  
                output_selector = ".output-image-container" 
                text_box_selector = ".annotation-text-input" 
                submit_button = ".submit-next-button"       

                # Wait for elements to be visible (handles slow loading pages)
                await page.wait_for_selector(input_selector, timeout=30000)
                
                input_locator = page.locator(input_selector)
                output_locator = page.locator(output_selector)
                
                input_box = await input_locator.bounding_box()
                input_img = await input_locator.screenshot()
                output_img = await output_locator.screenshot()

                # 2. STRICT AI PROMPT
                prompt = """
                You are a strict QA image inspector. Compare the Input image to the Output image.
                Identify ONE major difference based on this priority: 1. Subject, 2. Object, 3. Background.
                
                You must respond ONLY with a raw JSON block. Do not include markdown formatting or explanations.
                The instruction MUST start with one of these exact words: Add, Remove, Change, Replace, Apply.
                Use a normalized scale from 0 to 1000 for coordinates.

                {
                    "ymin": 250,
                    "xmin": 300,
                    "ymax": 450,
                    "xmax": 500,
                    "instruction": "Replace the subject's shirt with a black leather jacket."
                }
                """
                
                print("Analyzing images...")
                response = ollama.generate(
                    model=MODEL_NAME,
                    prompt=prompt,
                    images=[input_img, output_img]
                )
                
                # 3. AGGRESSIVE JSON PARSING
                raw_text = response['response']
                
                # Use regex to find anything that looks like a JSON dictionary
                json_match = re.search(r'\{.*?\}', raw_text, re.DOTALL)
                if not json_match:
                    raise ValueError(f"AI failed to return JSON. Raw output: {raw_text}")
                
                data = json.loads(json_match.group())
                print(f"AI Decision: {data['instruction']}")

                # 4. CALCULATE PIXELS
                start_x = input_box['x'] + (data['xmin'] * input_box['width'] / 1000)
                start_y = input_box['y'] + (data['ymin'] * input_box['height'] / 1000)
                end_x = input_box['x'] + (data['xmax'] * input_box['width'] / 1000)
                end_y = input_box['y'] + (data['ymax'] * input_box['height'] / 1000)

                # 5. EXECUTE BROWSER ACTIONS
                # Select Draw Tool (D)
                await page.keyboard.press("d") 
                await asyncio.sleep(0.5)
                
                # Draw the box
                await page.mouse.move(start_x, start_y)
                await page.mouse.down()
                await page.mouse.move(end_x, end_y, steps=15)
                await page.mouse.up()
                
                # Type the instruction
                await page.fill(text_box_selector, data['instruction'])

                # 6. HUMAN PACING LOGIC
                # Calculate how long the AI took, and wait the remaining time to hit ~3 mins
                elapsed = (datetime.datetime.now() - start_time).total_seconds()
                # Randomize the total time between 2.5 and 3.5 minutes
                target_time = random.uniform(150, 210) 
                
                sleep_time = max(5, target_time - elapsed)
                print(f"Waiting {int(sleep_time)} seconds to mimic human pacing...")
                await asyncio.sleep(sleep_time)

                # 7. SUBMIT
                await page.click(submit_button)
                print("Task Submitted.")
                tasks_completed += 1
                
                # Small wait for the next page transition
                await asyncio.sleep(random.uniform(3, 7))
                
            except Exception as e:
                print(f"Error on task: {e}")
                print("Attempting to refresh page and retry in 10 seconds...")
                await asyncio.sleep(10)
                await page.reload()
                await asyncio.sleep(5) # Wait for reload

asyncio.run(run_autonomous_worker())