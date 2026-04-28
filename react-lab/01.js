import {useState} from "react";

const App = () => {
  const [text, setText ] = useState("")

  return(
    <div>
      <center>
      <p>Enter the text: &nbsp;
      <input
      type="text"
      onChange={(event) => setText(event.target.value)}/>
      </p>
      <p>The text that you entered is: {text}</p>
      </center>
    </div>
  )
}

export default App