import axios from 'axios';

class UserService{
    constructor(token) {
        this.headerObject = {headers: {authorization: `Bearer ${token}`}}
    }

    // client to server and from server goes to Cloudinary
    uploadImage= async(file)=>{
        return axios.post(process.env.REACT_APP_SERVER_URL+ "/user/upload", file, this.headerObject)
        .then (res => res.data)
        .catch((err)=>console.log(err))
    }
    
    // Client to server and from server to DB 
    avatarDB= async(avatar)=>{
        return axios.post(process.env.REACT_APP_SERVER_URL+ "/user/avatar", avatar, this.headerObject)
        .then (res => res.data)
        .catch((err)=>console.log(err))
    }
}

export default new UserService();