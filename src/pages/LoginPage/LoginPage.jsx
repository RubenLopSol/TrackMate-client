import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import Loading from "../../components/Loading/Loading";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    if(email === "") {
      setErrorMessage("Please, enter email")
      return;
    }
    if(password === "") {
      setErrorMessage("Please, enter password")
      return;
    }
    setIsLoading(true);

    authService
      .login(requestBody)
      .then((response) => {

        storeToken(response.data.authToken);
        authenticateUser();
        setTimeout(()=> {
          navigate(`/profile`);
          setIsLoading(false);
        }, 1000)
      })
      .catch((error) => {

        const errorDescription = error.response.data.message;
        setIsLoading(false);
        setErrorMessage(errorDescription);
      });
  };

  if(isLoading) {
    return <Loading/>
  }
  return (
<div className="LoginPage w-50 mx-auto row">
  <h3 className="mt-2 mb-4">Login</h3>

  <form onSubmit={handleLoginSubmit}>
    
      <div className="mt-2 mb-4"> 
        <label>Email address</label>
        <input type="email" className="form-control mt-2" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
      </div>

      <div className="mt-4 mb-3">
        <label>Password</label>
        <input type="password" className="form-control mt-2" placeholder="Enter password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
      </div>  
     
      <button type="submit" className="btn btn-primary">Login</button>
  </form>
  {errorMessage && <p className="error-message">{errorMessage}</p>}
  <div className="mt-3">
<p>Don't have an account yet ? </p> 
    <Link id="link" to="/signup" className="link btn btn-primary mt-1">Sign up</Link> 

  </div>
  </div>
  );
}

export default LoginPage;
