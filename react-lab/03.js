import { useState } from "react";

const App = () => {
  const [count,setcount] = useState(0);
  const [step, setstep] = useState(1);

  const increase =()=>{
    setcount(step + count);
  };

  const decrease = () => {
    if( count - step >= 0){
      setcount(count - step);
    }else{
      setcount(0);
    }
  };

  const reset = () => {
    setcount(0);
    setstep(1);
  };

  return(
    <div>
      <h1>{count}</h1>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
      <button onClick={reset}>Reset</button>

      <p>
        Step Value:
        <input
        type="number"
        value={step}
        onChange={(event) => setstep(Number(event.target.value))}
      />
        </p>
    </div>
  );
};

export default App



// .header{
//   width: 100%;
//   position: fixed;
//   top: 0;
//   background-color: gray;
//   color: white;
//   margin: 0;
//   padding: 25px;
// }


// .footer{
// width: 100%;
// position: fixed;
// bottom: 0;
// background-color: gray;
// color: white;
// }