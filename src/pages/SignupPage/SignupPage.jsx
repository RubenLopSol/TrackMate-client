import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRep, setPasswordRep] = useState("");
  const [userName, setuserName] = useState("");
  const [lastname, setuserLastname] = useState(" ")
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isTransporter, SetIsTransporter] = useState(false);

  const navigate = useNavigate();

  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    if(userName === "" || lastname === "" || password === "" || passwordRep === "") {
      setErrorMessage("faltan campos!");
      return;
    }
    if(password !== passwordRep) {
      setErrorMessage("passwords no coinciden!");
      return;
    }
    /* const requestBody = { email, password, passwordRep, userName }; */
    
    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    axios.post(process.env.REACT_APP_SERVER_URL+"/auth/signup", {userName, lastname, isTransporter, email, password})
        .then(response => {
          console.log(response.data)
          if(response.data.error === "el usuario ya existe") {
            setErrorMessage(response.data.error)
            return;
          }
          else {
            navigate("/login");
          }
        })
        .catch(err => {
            console.log(err);
            setErrorMessage("Ha habido un error y no se ha podido registrar");
            return;
        })
  };

  return (
    <div className="SignupPage w-75 mx-auto">
    <h3>Sign Up</h3>
    <select className="form-select w-25 mx-auto" aria-label="Default select example">
      <option onChange={()=>SetIsTransporter(false)}>User</option>
      <option onChange={()=>SetIsTransporter(true)}>Driver</option>
    </select>
    <form className="w-25 mx-auto" onSubmit={handleSignupSubmit}>
      <div className="mb-3">
        <label>User Name</label>
        <input type="text" className="form-control" placeholder="First name" value={userName} onChange={(e)=>setuserName(e.target.value)}/>
      </div>
        <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name" value={lastname} onChange={(e)=>setuserLastname(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
        </div>  
        <div className="mb-3">
          <label>Repeat your Password</label>
          <input type="password" className="form-control" placeholder="Enter password" onChange={(e)=>setPasswordRep(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p className="text-right">Already registered ? <Link id="link" to="/login">Login</Link> </p>
    </div>
  );
}

export default SignupPage;
