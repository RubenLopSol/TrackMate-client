import "./NewPackage.css";
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Autocomplete from "../NewPackage/Autocomplete"
import Loading from "../../components/Loading/Loading";

function NewPackage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addressInput, setAddress] = useState("");
  const [size, setSize] = useState("");
  const [coordinates, setCoordinates] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate= useNavigate();

  const getAdressHandler = (latLng, address) => {
    setCoordinates(latLng);
    setAddress(address);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post("http://localhost:5005/package/new", { title, description, size, address: addressInput, coordinates})
    .then(result => {
      setIsLoading(false)
      navigate("/");
    })
    .catch(err => {
      setIsLoading(false);
      console.log(err)
    })
  }
  if(isLoading) {
    return <Loading/>
  }
  return (
<div className="NewPage w-75 mx-auto">
<h3>Add newPackage</h3>

<form className="w-25 mx-auto" onSubmit={submitHandler}>

  <div className="mb-3">
    <label>Title</label>
    <input type="text" className="form-control" placeholder="First name" value={title} onChange={(e) => setTitle(e.target.value)} />
  </div>

    <div className="mb-3">
      <label>Description</label>
      <input type="text" className="form-control" placeholder="Last name" value={description} onChange={(e) => setDescription(e.target.value)} />
    </div>

    <div className="mb-3">
      <label>Size</label>
      <select className="form-select form-select-mb-3" aria-label="Default select example" onChange={(e) => setSize(e.target.value)}>
              <option className="" value="XS">XS</option>
              <option className="" value="S">S</option>
              <option className="" value="M">M</option>
              <option className="" value="L">L</option>
              <option className="" value="XL">XL</option>
              <option className="" value="XXL">XXL</option>
       </select>
       
    <div className="mb-3">
      <label>Address</label>
      <Autocomplete getAdressHandler={getAdressHandler}/>
    </div>

    
    </div>

    <button type="submit" className="btn btn-primary">Submit</button>
</form>

</div>
  );
}
export default NewPackage;