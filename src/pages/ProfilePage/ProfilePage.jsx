import "./ProfilePage.css";
import React, { useContext } from "react"
import { AuthContext } from "../../context/auth.context";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [packagesData, setpackagesData] = useState([]);
  const [isTransporter, setIsTransporter] = useState(false)

  /* const navigate = useNavigate() */
  const { user } = useContext(AuthContext)

  useEffect(()=> {
    axios.get(`http://localhost:5005/package/${user._id}`)
      .then(result => {
        setpackagesData(result.data);
      })
      .catch(err => console.log(err))
  }, [])

  const deleteHandler = (idDelete) => {
    axios.delete(`http://localhost:5005/package/delete/${idDelete}`)
  }
  return(
    <>
      {!user.isTransporter && 
      <div>
        <h2>{user.username} profile</h2>
        <div className="row mx-auto">
          {packagesData.map(data => {
            return(
              <div key={data._id} className="col-sm-6 mb-3 mb-sm-0 mt-2">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Package name: {data.title}</h5>
                    <p className="card-text">Descripción: {data.description}</p>
                    <p className="card-text">Address: {data.address}</p>
                    <button onClick={()=>deleteHandler(data._id)}>Delete</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>}
      {user.isTransporter && <p>Is transporter</p>}
      <Link to={`/user/newPackage/${user._id}`}><button type="button" className="btn btn-primary mt-2">New package</button></Link>
    </>
    
 )
}

export default ProfilePage;