import "./ProfilePage.css";
import React from "react"
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function ProfilePage() {
  const [packagesData, setpackagesData] = useState([]);
  const [isTransporter, setIsTransporter] = useState(false)

  const { idUser } = useParams()

  useEffect(()=> {
    axios(`http://localhost:5005/package/${idUser}`)
      .then(result => {
        setpackagesData(result.data);
      })
      .catch(err => console.log(err))
  }, [])

  return(
    <>
      {!isTransporter && 
      <div>
        <h2>Is user</h2>
        <div className="row mx-auto">
          {packagesData.map(data => {
            return(
              <div key={data._id} className="col-sm-6 mb-3 mb-sm-0 mt-2">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Package name: {data.title}</h5>
                    <p className="card-text">Descripción: {data.description}</p>
                    <p className="card-text">Address: {data.address}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>}
      {isTransporter && <p>Is transporter</p>}
      <Link to={`/user/newPackage/${idUser}`}><button type="button" className="btn btn-primary mt-2">New package</button></Link>
    </>
    
 )
}

export default ProfilePage;