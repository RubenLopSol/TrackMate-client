import "./userInfo.css";
import userService from "../../services/user.service"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";

function UserInfo (){
    const [avatar, setAvatar] = useState("");
    const { user } = useContext(AuthContext);
    console.log("user=",user)
    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append("avatar", e.target.files[0]);
        userService.uploadImage(uploadData)
        .then(response=>{
            console.log("response is: ", response);
            setAvatar(response.fileUrl);
        })
        .catch(err => console.log("Error while uploading the file: ", err));
    };

    // handlesubmit to send the avatar to DB
    const handleSubmit = (e) =>{
        e.preventDefault();
        userService.avatarDB(user._id,{ avatar })
        console.log("esto es avatar en handleSubmit",avatar)
        //console.log("id=",user._id)
        .then((res)=>{ 
            console.log("hola",res)
            console.log("This is the result from post to database")
            setAvatar("")
        })
        .catch((err)=>console.log(err)) 
    }
    
        // userService.avatarFromDB(user._id)
        // .then((result)=>{
        //     console.log("result", result.avatar)
        //     setAvatar(result.avatar)
        //     console.log("This is coming from Database")
        // })
        // .catch((err)=> console.log(err))
    return(
        <div>
            
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add avatar
            </button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add avatar</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                        <div className="form-group">
                                <input type="file" className="btn btn-secondary" onChange={(e)=>handleFileUpload(e)}name="avatar"/>
                        </div>

                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                        </form>
                    </div>
               
                </div>
            </div>
            </div>
            <img id="img" src={user.avatar} alt="avatar" />
            <p><strong>Name: </strong>{user.username}</p>
            <p><strong>id: </strong>{user._id}</p>
        
        </div>
    )
}
export default UserInfo;






