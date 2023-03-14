import "./SelectTrans.css";
import Totalmap from "../../components/Maps/Totalmap"
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context";
import Directions from "../Directions/Directions";

function SelectTrans() {

  const { user } = useContext(AuthContext)

  return (
    <>
      {user.isTransporter &&
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