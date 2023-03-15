import axios from 'axios';
import { AuthContext } from '../context/auth.context';

class PackageService {
  constructor(token) {
      this.headerObject = {headers: {authorization: `Bearer ${token}`}}
  }

  // GET /package/all
  getAllPackages = async () => {
    return axios.get(process.env.REACT_APP_API_URL + "/package/all");
  }
  // GET /package/:userid
  getUserPackages = async (userid) => {
    return axios.get(process.env.REACT_APP_API_URL + `/package/${userid}`);
  }

  /* // POST /api/examples
  createOne = async (requestBody) => {
    return this.api.post('/new', requestBody);
  }

  // PUT /api/examples/:id
  updateOne = async (packageId, requestBody) => {
    return this.api.put(`/edit/${packageId}`, requestBody);
  }

  // DELETE /api/examples/:id
  deleteProject = async (packageId) => {
    return this.api.delete(`/delete/${packageId}`);
  }  */

}

// Create one instance of the service
/* const packageService = new PackageService(); */

export default PackageService;