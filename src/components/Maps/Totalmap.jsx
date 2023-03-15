import { Box, Flex } from '@chakra-ui/react'
import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { useState, useEffect, useContext } from 'react'
import axios from "axios"
import box from "./box.png"
import {packageContext} from '../../context/packages.context'

const center = { lat: 41.392478, lng: 2.144170 }


function TotalMap() {

  const { addDriverPackage } = useContext(packageContext)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyB-bxisiqGND7MJCIQkaE7bbu2bjGSCC0g',
    libraries: ['places'],
  })

  const [packages, setPackages] = useState([])

  const image = box

  useEffect(() => {
    axios.get(`http://localhost:5005/package/all`)
      .then((response) => {
        setPackages(response.data)
      })
      .catch(err=>console.log(err))
  }, [])

  if (!isLoaded) {
    return <p>Loading...</p>
  }

  const addPackageHandler = (packId) => {
    addDriverPackage(packages.find((pack)=> packId === pack._id ))
  }
  console.log("PAQUETES: ", packages)
  return (
    <>
      <Flex
        position='relative'
        flexDirection='column'
        alignItems='center'
        h='100vh'
        w='100vw'
      >
        <Box position='absolute' left={0} top={0} h='100%' w='100%'>

          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '50%', height: '50%' }}
            options={{
              zoomControl: true,
              mapTypeControl: true,
            }}
          >
            {packages.map(pack => {
            return (
              <div key={pack._id}>
                <Marker position={pack.coordinates} icon={image}>
                  <InfoWindow position={pack.coordinates} visble={true}>
                    <div>
                      <p>{pack._id}</p>
                      <p>{pack.address}</p>
                      <button onClick={()=> addPackageHandler(pack._id)}>Add route</button>
                    </div>
                  </InfoWindow>
                </Marker>
              </div>
            )})}

          </GoogleMap>
        </Box>

      </Flex>

    </>

  )
}

export default TotalMap;



