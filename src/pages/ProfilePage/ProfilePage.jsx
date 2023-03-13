import "./ProfilePage.css";
import React, { useContext } from "react"
import { AuthContext } from "../../context/auth.context";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Autocomplete from "../NewPackage/Autocomplete"

function ProfilePage() {
  const [packagesData, setpackagesData] = useState([]);
  const [isTransporter, setIsTransporter] = useState(false);
  const [coordinates, setCoordinates] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addressInput, setAddress] = useState("");
  const [size, setSize] = useState("");

  const { user } = useContext(AuthContext)

  const navigate = useNavigate();

  const getAdressHandler = (latLng, address) => {
    setCoordinates(latLng);
    setAddress(address);
  }

  const editar = (idPackage) => {
    axios.put(`http://localhost:5005/package/${idPackage}/edit`)
    .then(result => {
  
        console.log("hola")
      navigate(`/select`)
    })
  }
  const submitHandler = (e) => {
    e.preventDefault();
editar();
  }

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
          <h2>Is user</h2>
          <div className="row mx-auto">
            {packagesData.map(data => {
              return (
                <div key={data._id} className="col-sm-6 mb-3 mb-sm-0 mt-2">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Package name: {data.title}</h5>
                      <p className="card-text">Descripción: {data.description}</p>
                      <p className="card-text">Address: {data.address}</p>
                      <p className="card-text">Package size: {data.size}</p>
                      <p className="card-text">State: {data.isTransported}</p>
                      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              <div className="w-50 mx-auto">
                                <form onSubmit={submitHandler}>
                                  <div className="mb-3">
                                    <label htmlFor="exampleInputtTitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="exampleInputtTitle" placeholder="package name ..." value={title} onChange={(e) => setTitle(e.target.value)} />
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="exampleInputDescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="exampleInputDescription" placeholder="some description ..." value={description} onChange={(e) => setDescription(e.target.value)} />
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                                    <Autocomplete getAdressHandler={getAdressHandler} />
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="exampleInputSize" className="form-label">Size</label>
                                    <select className="form-select" aria-label="Default select example" onChange={(e) => setSize(e.target.value)}>
                                      <option>Select size</option>
                                      <option value="XS">XS</option>
                                      <option value="S">S</option>
                                      <option value="M">M</option>
                                      <option value="L">L</option>
                                      <option value="XL">XL</option>
                                      <option value="XXL">XXL</option>
                                    </select>
                                    <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" onClick={()=> editar(data._id)}>Save changes</button>
                                    <button onClick={()=>deleteHandler(data._id)}>Delete</button>
                                  </div>

                                  </div>
                                  
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              
            )
          })}
        </div>
      </div>}
      {user.isTransporter && <p>Is transporter</p>}
      <Link to={`/user/newPackage`}><button type="button" className="btn btn-primary mt-2">New package</button></Link>
    </>

  )
}

export default ProfilePage;