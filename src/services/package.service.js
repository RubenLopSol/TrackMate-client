import axios from 'axios';

class PackageService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }
  // GET /api/examples
  getAll = async () => {
    return this.api.get('/all');
  }
  
  // GET /api/examples/:id
  getOne = async (idPackage) => {
    return this.api.get(`/${idPackage}`);
  }

  // POST /api/examples
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
  } 


}

// Create one instance of the service
const packageService = new PackageService();

export default packageService;