import "./profileUser.css";
import { Link } from "react-router-dom";
import { useContext,useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios"



function ProfileUser(){
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + '/package/all')
        .then(result => {
            console.log(result)
        })
        .catch(err=>console.log(err))
    })

    return(
        <div>


        </div>
    )
};

export default ProfileUser;