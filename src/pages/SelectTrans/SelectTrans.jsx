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
    <div>
      <Navbar />
      <div className="link">
        <Link className="btn btn-info btn-lg btn-block mt-4 mx-auto" to="/user/navigation">Start navigation</Link>
      </div>
              
      {user.isTransporter &&
      <div style={{overflow:"hidden"}}>
          <div className="row" >
            <div className="col-sm-8">
              <Totalmap />
            </div>
            <div className="col-sm-3 mt-5 ">
              <SelectedPackages />
            </div>
          </div> 
        </div>      
      }
          
    </div>
  );
}
export default SelectTrans;