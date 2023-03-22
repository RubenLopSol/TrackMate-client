import "./LoginPage.css";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    if (email === "") {
      setErrorMessage("Please, enter email")
      return;
    }
    if (password === "") {
      setErrorMessage("Please, enter password")
      return;
    }
    setIsLoading(true);

    authService
      .login(requestBody)
      .then((response) => {

        storeToken(response.data.authToken);
        authenticateUser();
        setTimeout(() => {
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

  if (isLoading) {
    return <Loading />
  }
  return (   
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

              <form onSubmit={handleLoginSubmit} style={{width: "23rem"}}>

                <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Log in</h3>

                <div className="form-outline mb-4">
                  <input type="email" id="form2Example18" className="form-control form-control-lg" value={email} onChange={(e)=> setEmail(e.target.value)} />
                  <label className="form-label" htmlFor="form2Example18">Email address</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form2Example28" className="form-control form-control-lg" value={password} onChange={(e)=> setPassword
                  (e.target.value)} />
                  <label className="form-label" htmlFor="form2Example28">Password</label>
                </div>
                {errorMessage && <div className="alert alert-danger mx-auto" role="alert">
                  <p className="m-auto">{errorMessage}</p>
                </div>}

                <div className="pt-1 mb-4">
                  <button className="btn btn-info btn-lg btn-block" type="submit">Login</button>
                </div>

                <p>Don't have an account? <Link to="/signup" className="link-info">Register here</Link></p>

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

export default LoginPage;
