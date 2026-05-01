import { useState } from "react";

const BasicFigure = ({imageUrl,caption}) => {
  return(
    <div>
      <img src={imageUrl} alt="" width="150" />
      <p>{caption}</p>
    </div>
  );
};
const FigureLIst = () => {
  const [figures,setfigures] = useState([]);

  const add = () => {
    setfigures([
      ...figures,
      {imageUrl: `https://picsum.photos/200?random=${(figures.length + 1)}`,
      caption:`Random Image ${figures.length+1}`}
    ]);
  };
  const remove = () => {
    setfigures(figures.slice(0,-1))
  }
  return(
    <div>
      <button onClick={add}>Add</button>
      <button onClick={remove}>Remove</button>
      {figures.map((f,i) => (
        <BasicFigure key={i} imageUrl={f.imageUrl} caption={f.caption} />
        ))}
    </div>
  );
};

export default function App() {
  return(
    <div>
      <h1>Gallery</h1>
      <FigureLIst />
      </div>
  );
};