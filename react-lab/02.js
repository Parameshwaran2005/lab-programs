import './App.css'

const Header =(props) =>{
  return(
    <div className={props.className}>
      <h1>{props.title}</h1>
    </div>
  )
}

const Footer = (props) =>{
  return(
    <div className={props.className}>
      <h1>{props.tagline}</h1>
    </div>
  )
}

const App = () => {
  return(
    <div>
      <center>
        <Header className='wild' title="Welcome to vtu"/>
        <br/>
        <br/>
        <br/>
        <br/>
        <p>This is middle of webpage</p>
        <br />
        <Footer className='dilw' tagline="© 2026 Parameshwaran "/>
      </center>
    </div>
  )
}

export default App


// .wild {
//     background-color: black;
//     color: white;
//     position: fixed;
//     top: 0;
//     width: 100%;
// }

// .dilw {
//     background-color: black;
//     color: white;
//     position: fixed;
//     bottom: 0;
//     width: 100%;
// }