import "./SelectTrans.css";
import Totalmap from "../../components/Maps/Totalmap"
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context";
import Navbar from "../../components/Navbar/Navbar";
import SelectedPackages from "../../components/SelectedPackages/SelectedPackages"
import { Link } from "react-router-dom";


function SelectTrans() {

  const { user } = useContext(AuthContext)

  return (
    <>
      <Navbar />
      <div className="link">
        <Link className="btn btn-primary mx-auto mt-3" to="/user/navigation" >Start navigation</Link>
      </div>
              
      {user.isTransporter &&
        <>
          <div className="row">
            <div className="col-sm-7">
              <Totalmap />
            </div>
            <div className="col-sm-4 me-2 mt-5">
              <SelectedPackages />
            </div>
          </div>

        </>
      }
      
    </>
  );
}

export default SelectTrans;