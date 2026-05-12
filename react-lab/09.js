import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import './App.css'

const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Page</h1>;
const Contact = () => <h1>Contact Page</h1>;

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" end>Home </NavLink>
        <NavLink to="/about">About </NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// a {
//   margin-right: 12px;
//   text-decoration: none;
//   color: gray;
// }

// a.active {
//   color: blue;
//   font-weight: bold;
// }