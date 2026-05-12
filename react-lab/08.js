import { useState } from "react";
import './App.css'

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    setTasks([
      ...tasks,
      {
        name: text,
        dueDate: date,
        completed: false
      }
    ]);

    setText("");
    setDate("");
  };

  const delTask = (i) => {
    setTasks(tasks.filter((_, index) => index !== i));
  };

  const toggle = (i) => {
    const copy = [...tasks];
    copy[i].completed = !copy[i].completed;
    setTasks(copy);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>Reminder App</h1>

      <input
        placeholder="Task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={addTask}>Add</button>

      <br /><br />

      <button onClick={() => setFilter("all")}>
        All
      </button>

      <button onClick={() => setFilter("completed")}>
        Completed
      </button>

      <button onClick={() => setFilter("pending")}>
        Pending
      </button>

      <ul>
        {filteredTasks.map((t, i) => (
          <li key={i}>
            <span
              style={{
                textDecoration:
                  t.completed ? "line-through" : "none"
              }}
            >
              {t.name} - {t.dueDate}
            </span>

            <button onClick={() => toggle(i)}>
              Toggle
            </button>

            <button onClick={() => delTask(i)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;


// .container{
//     display: flex;
//     flex-direction: column;
//     gap: 10px;

//     width: 300px;
//     margin: auto;

//     border: 1px solid black;
//     padding: 20px;
// }
