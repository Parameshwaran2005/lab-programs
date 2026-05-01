import { useState } from "react";

const App = () => {
  const[name,setname] = useState("");
  const[email,setEmail] = useState("");
  const[password,setpassword] = useState("");
  const [showpass,setshowpass] = useState(false);
  const[nameerr,setnameerr] = useState(false);
  const [emailerr,setemailerr] = useState(false);
  const [passerr,setpasserr] = useState(false);
  const handlesubmit = (e) => {
    e.preventDefault();
    let isvalid = true;
    setnameerr(false);
    setemailerr(false);
    setpasserr(false);
    if(name===""){
      setnameerr(true);
      isvalid = false;
    }
    if(!email.includes("@") || !email.includes(".")){
      setemailerr(true);
      isvalid = false;
    }
    if(password.length < 6){
      setpasserr(true);
      isvalid = false;
    }
    if(isvalid){
      console.log("Success! Data: ",name,email,password);
      alert("Form Submitted");
    }
    };
    const getStyle = (hasError) => ({
      border: hasError ? "2px solid red": "1px solid black"
    });
    return(
      <form onSubmit={handlesubmit} style={{margin:"20px"}}>
        <h2>Registration Form</h2>
        <p>Name:
          <input value={name} onChange={e => setname(e.target.value)} style={getStyle(nameerr)} />
        </p>
        <p>Email:
          <input value={email} onChange={e => setEmail(e.target.value)} style={getStyle(emailerr)} />
        </p>
        <p>Password:
          <input type={showpass ?"text": "password"}
          value={password}
          onChange={e=>setpassword(e.target.value)}
          style={getStyle(passerr)}
          />
          {passerr && <p style={{color: "red"}}>should be greater than 6</p>}
        </p>
        <p>
          <input type="checkbox" onChange={() => setshowpass(!showpass)} />
          Show Password
        </p>
        <button type="submit">Submit</button>
      </form>
    );
  
};

export default App