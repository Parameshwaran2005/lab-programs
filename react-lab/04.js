import { useState } from "react";

const ToDoFunction = () => {
  const [task, settask] = useState([]);
  const [text, settext] = useState("");

  const addtask = () => {
    settask([...task, {name:text,isDone: false}]);
    settext("")
  };

  const deltask = (i) => {
    settask(task.filter((_, index) => index !== i));
  };

  const toggle = (i) =>{
    const copy =[...task]
    copy[i].isDone = !copy[i].isDone;
    settask(copy)
  }
  return (
    <div>
      <h1>To Do List</h1>

      <input
        value={text}
        onChange={(e) => settext(e.target.value)}
      />
      <button onClick={addtask}>Add Task</button>

      <ul>
        {task.map((t, i) => (
          <li key={i}>
            <span style ={{textDecoration: t.isDone ? "line-through" : "none"}}>
            {t.name}
            </span>

            <button onClick={() => deltask(i)}>Delete</button>
            <button onClick={() => toggle(i)}>Completed</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoFunction;