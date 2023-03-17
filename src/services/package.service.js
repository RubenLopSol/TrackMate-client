import axios from 'axios';

class PackageService {
  constructor(token) {
      this.headerObject = {headers: {authorization: `Bearer ${token}`}}
  }

  // GET /package/all
  getAllPackages = () => {
    return axios.get(process.env.REACT_APP_SERVER_URL + "/package/all", this.headerObject);
  }
  // GET /package/:idPackage
  getPackage = (idPackage) => {
    return axios.get(process.env.REACT_APP_SERVER_URL + `/package/${idPackage}`, this.headerObject);
  }

  // GET /package/:idUser
  getUserPackages = (idUser) => {
    return axios.get(process.env.REACT_APP_SERVER_URL + `/package/${idUser}`, this.headerObject);
  }

  // POST /package/new
  createOne = (requestBody) => {
    return axios.post(process.env.REACT_APP_SERVER_URL + '/package/new', requestBody);
  }

  // PUT /package/:idPackage/edit
  updateOne = (packageId, requestBody) => {
    return axios.put(process.env.REACT_APP_SERVER_URL + `/package/${packageId}/edit`, requestBody, this.headerObject);
  }

  // DELETE /package/delete/:idPackage
  deletePackage = (packageId) => {
    return axios.delete(process.env.REACT_APP_SERVER_URL + `/package/delete/${packageId}`, this.headerObject);
  } 

}

const packageService = new PackageService();

export default packageService;