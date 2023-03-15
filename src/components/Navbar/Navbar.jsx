import "./Navbar.css";
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
        <li className="nav-item">
          <Link to="/profile" className="nav-link active" aria-current="page" >Profile</Link>
        </li>
        {user.isTransporter && 
          <li className="nav-item">
            <Link to ="/select" className="nav-link">Select</Link>
          </li> 
        }
        {!user.isTransporter && 
        <li className="nav-item">
          <Link to ="/user/tracking" className="nav-link">Track</Link>
        </li> 
        } 
        {!user.isTransporter &&
          <li className="nav-item">
            <Link to ="/user/newPackage" className="nav-link">New package</Link>
          </li> 
        }
        {/* {user.isTransporter &&
          <li className="nav-item">
            <Link to ="/user/navigation" className="nav-link">Navegation</Link>
          </li>
        } */}
       {/*  <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/select">/select</Link></li>
            <li><Link className="dropdown-item" to="/day">/day</Link></li>
            <li><Link className="dropdown-item" to="/user/:packageID">/user/:packageID</Link></li>
            <li><Link className="dropdown-item" to="/user/newPackage">/user/newPackage</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item" href="#">Something else here</Link></li>
          </ul>
        </li> */}
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

// {/* <nav>
     
// {isLoggedIn && (
//   <>
//     <button onClick={logOutUser}>Logout</button>

//     <Link to="/profile">
//       <button>Profile</button>
//       {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
//     </Link>

//     <span>{user && user.name}</span>
//   </>
// )}

// {!isLoggedIn && (
//   <>
//     <Link to="/signup">
//       {" "}
//       <button>Sign Up</button>{" "}
//     </Link>
//     <Link to="/login">
//       {" "}
//       <button>Login</button>{" "}
//     </Link>
//   </>
// )}
// </nav> */} */}