import "./SelectTrans.css";
import Totalmap from "../../components/Maps/Totalmap"
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context";
import Directions from "../Directions/Directions";
import Navbar from "../../components/Navbar/Navbar";

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
      {!user.isTransporter && 
        <div>
          <Directions/>
        </div>
      }
    </>
  );
}

export default SelectTrans;