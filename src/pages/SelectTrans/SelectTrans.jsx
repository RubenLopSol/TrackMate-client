import "./SelectTrans.css";
import Totalmap from "../../components/Maps/Totalmap"
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
function SelectTrans() {

  const { user } = useContext(AuthContext)

  return (
    <>
      <Navbar />
      {user.isTransporter&&
        <div>
          <Totalmap />
        </div>
      }
      <Link to={"/user/navigation"}>Navigation</Link>
    </>
  );
}

export default SelectTrans;