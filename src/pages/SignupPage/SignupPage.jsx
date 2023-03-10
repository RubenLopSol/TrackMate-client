import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRep, setPasswordRep] = useState("");
  const [username, setuserName] = useState("");
  const [lastname, setlastName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isTransporter, SetIsTransporter] = useState(false);

  const navigate = useNavigate();

  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    if(username === "" || password === "" || passwordRep === "" || lastname === "") {
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
    console.log("es transportador: ", isTransporter);
    axios.post(process.env.REACT_APP_SERVER_URL+"/auth/signup", {username, lastname, isTransporter, email, password})
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
    <div className="SignupPage w-75 mx-auto row">
    <h1>Sign Up</h1>
    <form onSubmit={handleSignupSubmit}>
      <select className="form-select" aria-label="Default select example" onChange={(e)=>SetIsTransporter(e.target.value)}>
        <option value={false}>User</option>
        <option value={true}>Driver</option>
      </select>
      <div className="mb-3">
        <label htmlFor="exampleInputuserName" className="form-label">Name</label>
        <input type="text" className="form-control" id="exampleInputuserName" value={username} onChange={(e)=>setuserName(e.target.value)}/>
        <div className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputuserlastName" className="form-label">Last name</label>
        <input type="text" className="form-control" id="exampleInputuserlastName" value={lastname} onChange={(e)=>setlastName(e.target.value)}/>
        <div className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPasswordRep" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPasswordRep" onChange={(e)=>setPasswordRep(e.target.value)}/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>

      {errorMessage && <div className="alert alert-danger mt-3" role="alert">
        {errorMessage}
      </div>}
      
      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
