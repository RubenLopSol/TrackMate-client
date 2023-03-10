import "./ProfilePage.css";
import React from "react"
import Autocomplete from "../NewPackage/Autocomplete"
function ProfilePage() {
   const getAdressHandler () => {
    
   }
 return(
  <h1><Autocomplete getAdressHandler={getAdressHandler}/></h1>
 )
}

export default ProfilePage;
