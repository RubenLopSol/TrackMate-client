import "./App.css";
import { Routes, Route } from "react-router-dom";

import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SelectTrans from "./pages/SelectTrans/SelectTrans";
import WorkDay from "./pages/WorkDay/WorkDay";
import Tracking from "./pages/TrackPackage/Tracking";
import NewPackage from "./pages/NewPackage/NewPackage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Directions from "./pages/Directions/Directions"

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/select"
          element={
            <IsPrivate>
              <SelectTrans />
            </IsPrivate>
          }
        />
        <Route
          path="/day"
          element={
            <IsPrivate>
              <WorkDay />
            </IsPrivate>
          }
        />
        {/* <Route
          path="/user/:packageID"
          element={
            <IsPrivate>
              <Tracking />
            </IsPrivate>
          }
        /> */}
        <Route
          path="/user/newPackage/:idUser"
          element={
            <IsPrivate>
              <NewPackage />
            </IsPrivate>
          }
        />
        <Route
          path="/user/directions"
          element={
            <IsPrivate>
              <Directions />
            </IsPrivate>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              {" "}
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
