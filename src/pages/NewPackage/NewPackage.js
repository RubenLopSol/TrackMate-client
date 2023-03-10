import "./NewPackage.css";
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
function NewPackage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [size, setSize] = useState("XS")
 const navigate= useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5005/package/new", { title, description, address, size})
      .then(result => {
        console.log(result)
      })
      .catch(err => console.log(err))
      navigate("/profile")
  }
  return (
    <>
      <div className="w-50 mx-auto">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputtTitle" className="form-label">Title</label>
            <input type="text" className="form-control" id="exampleInputtTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputDescription" className="form-label">Description</label>
            <input type="text" className="form-control" id="exampleInputDescription" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">Address</label>
            <input type ="text" className="form-control" value = {address} onChange={(e) => setAddress(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputSize" className="form-label">Size</label>
            <select className="form-select" aria-label="Default select example" value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
}
export default NewPackage;