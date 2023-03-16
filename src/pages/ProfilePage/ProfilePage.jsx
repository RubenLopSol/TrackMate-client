import React, { useContext } from "react"
import { AuthContext } from "../../context/auth.context";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Autocomplete from "../../components/Autocomplete/Autocomplete"
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar"
import Gif from "./giphy.gif"
import TransportProfile from "../../components/TransportProfile/TransportProfile"
import packageService from "../../services/package.service";
import UserInfo from "../../components/userInfo/userInfo";

function ProfilePage() {
  const [packagesData, setpackagesData] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [addressInput, setAddress] = useState("");
  const [idPackage, setIdPackage] = useState(null);
  const [filteredPack, setFiltered] = useState([])

  const { user } = useContext(AuthContext)

  const filterHandler = (filterInput) => {
    setFiltered(packagesData.filter(pack => pack._id.includes(filterInput)));
  }

  const getAdressHandler = (latLng, address) => {
    setCoordinates(latLng);
    setAddress(address);
  }

  const getAllPackages = () => {
    packageService.getUserPackages(user._id)
    .then(result => {
      setpackagesData(result.data);
      setFiltered(result.data);
    })
    .catch(err => console.log(err))
  }

  const submitEditHandler = (e) => {
    e.preventDefault();
    packageService.updateOne(idPackage, { address: addressInput, coordinates})
    .then(result => {
      getAllPackages();
    })
    .catch(err => console.log(err))
  }

  useEffect(()=> {
    getAllPackages();
  }, [])

  const deleteHandler = (idDelete) => {
    packageService.deletePackage(idDelete)
    .then(result => {
      getAllPackages();
    })
    .catch(err => console.log(err))
  }
  
  return(
    <>
      <Navbar />
      {!user.isTransporter && 

      <div className="row">
        <div className="col-sm-4"><UserInfo/></div>
        <div className="col-sm-8">
        <Link to={`/user/newPackage`}><button type="button" className="btn btn-primary m-5">New package</button></Link>
          <h2 className="mt-2 me-2"><SearchBar filter={filterHandler}/></h2>
          <div className="row mx-auto">
            {filteredPack.map(data => {
              return (
                <div key={data._id} className="col-sm-6 mb-3 mb-sm-0 mt-2">
                  <div className="card">
                    <div className="card-body">
                    <img className="w-25 h-25" src={Gif} alt="gif"></img>
                      <h5 className="card-title">Tracking number: {data._id}</h5>
                      <p className="card-text">Address: {data.address}</p>
                      <p className="card-text">State: {data.isTransported}</p>
                      {data.isTransported === "Pending" && <button type="button" className="btn btn-primary m-2" onClick={()=> setIdPackage(data._id)} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit adress</button>}
                      {data.isTransported === "In delivery" && <Link className="btn btn-primary m-2" to={`/user/tracking/${data._id}`}>Tracking</Link>}
                      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit adress</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            {/* Formulario para editar packete */}
                            <div className="modal-body">
                              <div className="w-50 mx-auto">
                                <form onSubmit={submitEditHandler}>
                                  <div className="mb-3">
                                    <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                                    <Autocomplete getAdressHandler={getAdressHandler} />
                                  </div>
                                  <div className="mb-3">
                                 
                                    <div className="modal-footer">
                                    <button type="submit" className="btn btn-danger me-2" data-bs-dismiss="modal" onClick={()=> deleteHandler(data._id)}>Delete</button>

                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save</button>

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
      </div>
     
      </div>}
      {user.isTransporter && 
      <TransportProfile/>}
    </>

  )
}

export default ProfilePage;