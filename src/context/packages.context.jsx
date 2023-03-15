import { createContext, useState } from "react";

const packageContext = createContext();

function PackagesProviderWrapper(props) {
    const [driverPackages, setDriverPackages] = useState([]);
    
    const addDriverPackage = (pack) => {
        setDriverPackages([...driverPackages, pack])
    }

    return(
        <packageContext.Provider value={{addDriverPackage, driverPackages}}>
            {props.children}
        </packageContext.Provider>
    )
}

export {packageContext, PackagesProviderWrapper};