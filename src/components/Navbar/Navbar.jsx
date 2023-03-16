import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {

  const { user, logOutUser } = useContext(AuthContext);
  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
    {user && <Link to={"/profile"} className="navbar-brand">TrackMate</Link>}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        {user.isTransporter && 
          <li className="nav-item">
            <Link to ="/select" className="nav-link">Select</Link>
          </li> 
        }
        <li className="nav-item">
          <Link className="nav-link" onClick={logOutUser} to="/login">Logout</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}

export default Navbar;

