import "./ProfilePage.css";
import React, { useContext } from "react"
import { AuthContext } from "../../context/auth.context";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Autocomplete from "../../components/Autocomplete/Autocomplete"
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar"
import Gif from "./giphy.gif"

function ProfilePage() {
  const [packagesData, setpackagesData] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addressInput, setAddress] = useState("");
  const [size, setSize] = useState("");
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
    axios.get(process.env.REACT_APP_SERVER_URL + `/package/${user._id}`)
    .then(result => {
      setpackagesData(result.data);
      setFiltered(result.data);
    })
    .catch(err => console.log(err))
  }

  const submitEditHandler = (e) => {
    e.preventDefault();
    axios.put(process.env.REACT_APP_SERVER_URL + `/package/${idPackage}/edit`, { address: addressInput, coordinates})
    .then(result => {
      getAllPackages();
    })
    .catch(err => console.log(err))
  }

  useEffect(()=> {
    getAllPackages();
  }, [])

  const deleteHandler = (idDelete) => {
    axios.delete(process.env.REACT_APP_SERVER_URL + `/package/delete/${idDelete}`)
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
        <div className="col-sm-4">USER INFORMATION</div>
        <div className="col-sm-8">
          <h2 className="mt-2"><SearchBar filter={filterHandler}/></h2>
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
                      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit adress</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
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
      <Link to={`/user/newPackage`}><button type="button" className="btn btn-primary m-3">New package</button></Link>
      </div>}
      {user.isTransporter && 
      <p>Is transporter</p>}
    </>

  )
}

export default ProfilePage;