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
  const [isTransporter, SetIsTransporter] = useState(null);

  const navigate = useNavigate();


  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (username === "") {
      setErrorMessage("Please, introduce username");
      return;
    }
    if (password === "") {
      setErrorMessage("Please, introduce password");
      return;
    }
    if (lastname === "") {
      setErrorMessage("Please, introduce lastname");
      return;
    }
    if (email === "") {
      setErrorMessage("Please, introduce email");
      return;
    }
    if (isTransporter === null) {
      setErrorMessage("Please, select type of user");
      return;
    }
    if (password !== passwordRep) {
      setErrorMessage("Passwords don't match!");
      return;
    }

    axios.post(process.env.REACT_APP_SERVER_URL + "/auth/signup", { username, lastname, isTransporter, email, password })
      .then(response => {
        if (response.data.error === "Email already exist") {
          setErrorMessage(response.data.error)
          return;
        }
        else if (response.data.error === "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.") {
          setErrorMessage(response.data.error)
          return;
        }
        else {
          navigate("/login");
        }
      })
      .catch(err => {
        setErrorMessage(err.request.response.split(":")[1]);
        return;
      })
  };

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form onSubmit={handleSignupSubmit} style={{width: "23rem"}}>

                <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Sign Up</h3>
                
                <div className="form-outline mb-4">
                  <select className="form-select form-control form-control-lg" aria-label="Default select example" onChange={(e) => SetIsTransporter(e.target.value)}>
                    <option></option>
                    <option value={false}>User</option>
                    <option value={true}>Driver</option>
                  </select>
                  <label htmlFor="exampleInputuserName" className="form-label">Select role</label>
                </div>
    
                <div className="form-outline mb-4">
                  <input type="text" className="form-control form-control-lg" id="exampleInputuserName" value={username} onChange={(e) => setuserName(e.target.value)} />
                  <label htmlFor="exampleInputuserName" className="form-label">Name</label>
                  <div className="form-text"></div>
                </div>

                <div className="form-outline mb-4">
                  <input type="text" className="form-control form-control-lg" id="exampleInputuserlastName" value={lastname} onChange={(e) => setlastName(e.target.value)} />
                  <label htmlFor="exampleInputuserlastName" className="form-label">Last name</label>
                  <div className="form-text"></div>
                </div>

                <div className="form-outline mb-4">
                  <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <div id="emailHelp" className="form-text"></div>
                </div>
                
                <div className="form-outline mb-4">
                  <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" className="form-control form-control-lg" id="exampleInputPasswordRep" onChange={(e) => setPasswordRep(e.target.value)} />
                  <label htmlFor="exampleInputPasswordRep" className="form-label">Repeat password</label>
                </div>
                
                {errorMessage && <div className="alert alert-danger mx-auto" role="alert">
                  <p className="m-auto">{errorMessage}</p>
                </div>}

                <div className="pt-1 mb-4">
                  <button className="btn btn-info btn-lg btn-block" type="submit">Submit</button>
                </div>

                <p>Already have account? <Link to="/login" className="link-info">Login here</Link></p>
              </form>
            </div>
          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img src="https://autoescuelasanmateo.es/wp-content/uploads/2022/11/curso-mercancias-cap.jpg"
            alt="Login images" className="w-100 vh-100" style={{objectFit: "cover", objectPosition: "left"}} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupPage;
