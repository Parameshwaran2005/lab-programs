import { useState } from "react";
import "./App.css";

const ProfileCard = (props) => {
  return(
    <div classsname="profile-card" style={{backgroundColor: props.bgColor}}>
      <img src={props.imgUrl} alt="Profile" className="profile-pic" />
      <h2>{props.name}</h2>
      <p>{props.bio}</p>
    </div>
  );
};

const App = () => {
  const [color,setcolor] = useState("white");
  const toggleColor = () => {
    setcolor(color === "white" ? "Lightblue" : "white");
  };

  return(
  <div style={{padding: "50px"}}>
    <center>
    <ProfileCard
    imgUrl="https://picsum.photos/100"
    name="Parameshwaran" 
    bio = "Executing React Lab Programs"
    bgColor={color}
    />
    <br />
    <button onClick={toggleColor}>Change Background Color</button>
  </center>
  </div>
  );
};

export default App



// .profile-card{
//     border: 2px solid black;
//     border-radius: 10px;
//     width: 250px;
//     padding: 20px;
//     text-align: center;
//     transition: transform 0.3s;
// }
// .profile-card:hover{
//     transform: scale(1.05);
// }
// .profile-pic{
//     width: 100px;
//     height: 100px;
//     border-radius: 50%;
// }