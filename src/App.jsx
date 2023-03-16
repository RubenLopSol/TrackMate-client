import "./App.css";
import { Routes, Route } from "react-router-dom";

import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SelectTrans from "./pages/SelectTrans/SelectTrans";
import Tracking from "./pages/TrackPackage/Tracking";
import NewPackage from "./pages/NewPackage/NewPackage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Index from "./pages/index"
import Navigation from "./pages/Navigation/Navigation"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";


function App() {
  return (
    <div className="App">
      <Routes>
      <Route
          path="/"
          element={
            <IsAnon>
              <Index />
            </IsAnon>
          }
        />
        <Route
          path="/"
          element={
            <IsAnon>
              <ProfilePage />
            </IsAnon>
          }
        />
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
          path="/user/navigation"
          element={
            <IsPrivate>
              <Navigation />
            </IsPrivate>
          }
        />
        <Route
          path="/user/newPackage"
          element={
            <IsPrivate>
              <NewPackage />
            </IsPrivate>
          }
        />
        <Route
          path="/user/tracking/:idpackage"
          element={
            <IsPrivate>
              <Tracking />
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
        <Route
          path="/*"
          element={
            <NotFoundPage />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
