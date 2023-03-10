import "./ProfilePage.css";
import React from "react"
import Autocomplete from "../NewPackage/Autocomplete"
import { useState } from "react";

function ProfilePage() {
  const [coordinates, setCoordinates] = useState({});

  const getAdressHandler = (latLng) => {
    setCoordinates(latLng);
    console.log(coordinates)
  }
  return(
    <Autocomplete getAdressHandler={getAdressHandler}/>
 )
}

export default ProfilePage;