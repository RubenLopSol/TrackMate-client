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

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    setIsLoading(true);

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        setTimeout(()=> {
          navigate(`/profile`);
          setIsLoading(false);
        }, 1000)
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
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
        <input type="email" className="form-control mt-2" placeholder="Enter email" value={email} onChange={handleEmail}/>
      </div>

      <div className="mt-4 mb-3">
        <label>Password</label>
        <input type="password" className="form-control mt-2" placeholder="Enter password" value={password} onChange={handlePassword}/>
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
