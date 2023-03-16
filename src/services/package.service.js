import axios from 'axios';

class PackageService {
  constructor(token) {
      this.headerObject = {headers: {authorization: `Bearer ${token}`}}
  }

  getAllPackages = async () => {
    return axios.get(process.env.REACT_APP_API_URL + "/package/all");
  }

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

export default PackageService;