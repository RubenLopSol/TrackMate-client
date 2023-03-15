import "./userInfo.css";
import UserService from "../../services/user.service"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";

function UserInfo (){
    const [avatar, setAvatar] = useState("");
    const { user } = useContext(AuthContext);

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append("avatar", e.target.files[0]);
        UserService.uploadImage(uploadData)
        .then(response=>{
            console.log("response is: ", response);
            setAvatar(response.fileUrl);
        })
        .catch(err => console.log("Error while uploading the file: ", err));
    };
    // handlesubmit to send the avatar to DB
    const handleSubmit = (e) =>{
        e.preventDefault();
        UserService.avatarDB({avatar})
        .then((res)=>{ 
            console.log(res)
            console.log("This is the result from post to database")
            setAvatar("")
        })
        .catch((err)=>console.log(err))
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="file" 
               onChange={(e)=>handleFileUpload(e)}/>
              </div>

              <button type="submit" className="btn" >Submit</button>
            </form>

        </div>
    )
}
export default UserInfo;