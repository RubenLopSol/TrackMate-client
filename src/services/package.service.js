import axios from 'axios';
import { AuthContext } from '../context/auth.context';

class PackageService {
  constructor(token) {
      this.headerObject = {headers: {authorization: `Bearer ${token}`}}
  }

  // GET /package/all
  getAllPackages = () => {
    return axios.get(process.env.REACT_APP_SERVER_URL + "/package/all");
  }
  // GET /package/:idPackage
  getPackage = (idPackage) => {
    return axios.get(process.env.REACT_APP_SERVER_URL + `/package/${idPackage}`);
  }

  // GET /package/:idUser
  getUserPackages = (idUser) => {
    return axios.get(process.env.REACT_APP_SERVER_URL + `/package/${idUser}`);
  }

  // POST /package/new
  createOne = (requestBody) => {
    return axios.post(process.env.REACT_APP_SERVER_URL + '/package/new', requestBody);
  }

  // PUT /package/:idPackage/edit
  updateOne = (packageId, requestBody) => {
    return axios.put(process.env.REACT_APP_SERVER_URL + `/package/${packageId}/edit`, requestBody);
  }

  // DELETE /package/delete/:idPackage
  deletePackage = (packageId) => {
    return axios.delete(process.env.REACT_APP_SERVER_URL + `/package/delete/${packageId}`);
  } 

}

const packageService = new PackageService();

export default packageService;