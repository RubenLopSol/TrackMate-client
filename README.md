## About Project

Hello! Our project intends to implement a very useful application to facilitate the delivery of packages by transport companies.
In turn, provide a detailed user experience, about the process in which the package is, for the recipient of it.
Below you will find more specific information about the code implemented in this case, the frontend part, with React.

![photo](imgREADME.png)

### Project Deployment

The project is deployed using fly.dev **[here](https://fly.io/apps/trackmateclient)**

### Work structure

We have developed this project using **[Trello](https://trello.com/b/ySq7J01o/proyecto-3)** to organize our workflow.

### Installation guide

Fork and clone this repo and follow the belo instructions

```
    npm install
    npm start
```

### User Roles

| Role             | Capabilities                                                                                                                                                                                                                      | Properities          |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| **User/User**    | User can `login/logout` to his/her personal profile and read/delete/create new packages, modify his/her personal data and one time package is send, can track the estatus of his sending looking the real position of the Carrier | isTransporter: false |
| **User/Carrier** | Carrier have access to `login/logout` and to all packages, stored by sending day, and a map with the most optimal route to deliver his/her cargo                                                                                  | isTransporter: true  |

### Routes

| Method     | Endpoint              | Description                                            |
| :--------- | :-------------------- | :----------------------------------------------------- |
| **POST**   | `/auth/login`         | return axios.post("http://localhost:5005/auth/login")  |
| **POST**   | `/auth/signup`        | return axios.post("http://localhost:5005/auth/signup") |
| **GET**    | `/auth/verify`        | return axios.post("http://localhost:5005/auth/verify") |
| **POST**   | `/api/examples`       | Send all packages to user                              |
| **GET**    | `/api/examples`       | Create a new package                                   |
| **GET**    | `/api/examples/${id}` | Send a especific information from edit form            |
| **PUT**    | `/api/examples/${id}` | Edit especific package base on his ID                  |
| **DELETE** | `/api/examples/${id}` | Delete especific package base on his ID                |


