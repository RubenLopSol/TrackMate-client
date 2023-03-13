import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
    <h1 className="navbar-brand" >Welcome {user.username}</h1>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/profile" className="nav-link active" aria-current="page" >Profile</Link>
        </li>
        <li className="nav-item">
          <Link to ="/select" className="nav-link">Select</Link>
        </li>
        <li className="nav-item">
          <Link to ="/user/newPackage" className="nav-link">New package</Link>
        </li>
        <li className="nav-item">
          <Link to ="/user/directions" className="nav-link">Direction</Link>
        </li>
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
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
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