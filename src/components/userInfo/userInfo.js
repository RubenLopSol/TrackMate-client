import "./userInfo.css";
import userService from "../../services/user.service"
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";

function UserInfo (){
    const [avatar, setAvatar] = useState("");
    const { user } = useContext(AuthContext);
    //console.log("user info before uploading image ::",user)
    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append("avatar", e.target.files[0]);
        userService.uploadImage(uploadData)
        .then(response=>{
            console.log("After uploading the avatar to Cloudinary :: ", response);
            setAvatar(response.fileUrl);
            localStorage.setItem("avatar", response.fileUrl); // store the image URL in local storage
        })
        .catch(err => console.log("Error while uploading the file: ", err));
    };
    const getAvatar = () => {
        userService
          .avatarFromDB(user._id)
          .then((result) => {
            console.log("result", result.avatar);
            setAvatar(result.avatar);
            console.log("This is coming from Database");
          })
          .catch((err) => console.log(err));
      };

    useEffect(() => {
        const storedAvatar = localStorage.getItem("avatar");
        if (storedAvatar) {
          setAvatar(storedAvatar);
        }
    }, []);

    // handlesubmit to send the avatar to DB
    const handleSubmit = (e) =>{
        e.preventDefault();
        userService.avatarDB(user._id,{ avatar })
        console.log("After update avator to DB",avatar)
        //console.log("id=",user._id)
        .then((res)=>{ 
            console.log("Result from Database",res)
            console.log("This is the result from post to database")
            setAvatar(res)
        })
        .catch((err)=>console.log(err)) 
    }

    return(
        <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h1 className="text-center">User Info</h1>
              </div>
              <div className="card-body">
                <div className="d-flex flex-column align-items-center">
                  <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add Avatar
                  </button>
                  <img id="img" src={avatar} alt="avatar" className="mb-3" />
                  <p><strong>Name:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Avatar</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input type="file" className="btn btn-secondary" onChange={(e) => handleFileUpload(e)} name="avatar" />
                  </div>
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
}
export default UserInfo;