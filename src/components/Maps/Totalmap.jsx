import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { useState, useEffect, useContext } from 'react'
import box from "./box.png"
import { packageContext } from '../../context/packages.context'
import { Box, Flex, position } from '@chakra-ui/react'
import packageService from "../../services/package.service";
import axios from 'axios'
import { AuthContext } from '../../context/auth.context'

const center = { lat: 41.392478, lng: 2.144170 }

function TotalMap() {
  const { addDriverPackage, deletePackages } = useContext(packageContext)
  const { user } = useContext(AuthContext)
  const [showMarkers, setShowMarkers] = useState({});
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyB-bxisiqGND7MJCIQkaE7bbu2bjGSCC0g',
    libraries:["places"],
  })
  const [packages, setPackages] = useState([])

  const image = box

  useEffect(() => {
    packageService.getAllPackages()
      .then((response) => {
        setPackages(response.data);
        deletePackages();
      })
      .catch(err => console.log(err))
  }, [])

  if (!isLoaded) {
    return <p>Loading...</p>
  } 
 
  const addPackageHandler = (packId) => {
    addDriverPackage(packages.find((pack) => packId === pack._id))
    setShowMarkers((prevMarkers) => ({ ...prevMarkers, [packId]: false }));
    axios.put(process.env.REACT_APP_SERVER_URL + `/package/${packId}/edit`, { driverAssigned: user._id, isTransported: "In delivery" })
  }

  return (
    <>
      <Flex
        display='flex'
        flexDirection='row'
        alignItems='center'
        h='100vh'
        w='70vw'
      >
        <Box position='relative' left={40} top={190} h='150%' w='100%'>
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '90%', height: '50%' }}
            options={{
              zoomControl: true,
              mapTypeControl: true,
            }}
          >
            {packages.map(pack => {
              return (
                <div key={pack._id}>
                {showMarkers[pack._id] !== false && (
                <Marker position={pack.coordinates} icon={image}>
                  <InfoWindow position={pack.coordinates} >
                    <div>
                      <p>{pack._id}</p>
                      <p>{pack.address}</p>
                      <button onClick={() => addPackageHandler(pack._id)}>Add to route</button>
                    </div>
                  </InfoWindow>
                </Marker>
              )}
                </div>
              )
            })}
          </GoogleMap>
        </Box>
      </Flex>
    </>
  )
}
export default TotalMap;