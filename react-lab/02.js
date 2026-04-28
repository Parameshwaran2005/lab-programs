const Header =(props) =>{
  return(
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

const Footer = (props) =>{
  return(
    <div>
      <h1>{props.tagline}</h1>
    </div>
  )
}

const App = () => {
  return(
    <div>
      <center>
        <Header title="Welcome to vtu"/>
        <br/>
        <p>This is middle of webpage</p>
        <br />
        <Footer tagline="© 2026 Parameshwaran "/>
      </center>
    </div>
  )
}

export default App