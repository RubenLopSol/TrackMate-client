import { createContext, useState } from "react";
import axios from "axios"

const packageContext = createContext();

function PackagesProviderWrapper(props) {
    const [driverPackages, setDriverPackages] = useState([]);
    
    const addDriverPackage = (pack) => {
        setDriverPackages([...driverPackages, pack])
        axios.put(process.env.REACT_APP_SERVER_URL + `/package/${pack._id}/edit`, {isTransported: "In delivery"})
    }

    return(
        <packageContext.Provider value={{addDriverPackage, driverPackages}}>
            {props.children}
        </packageContext.Provider>
    )
}

export {packageContext, PackagesProviderWrapper};