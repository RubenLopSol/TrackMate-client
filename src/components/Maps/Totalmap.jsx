import { Box, Flex } from '@chakra-ui/react'
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api'
import { useState, useEffect } from 'react'
import axios from "axios"
import box from "./box.png"

const center = { lat: 41.392478, lng: 2.144170 }


function App() {
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
  }, [])

  if (!isLoaded) {
    return <p>Loading...</p>
  }

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
            {packages.map(response => <Marker position={response.coordinates} icon={image}/>)}

          </GoogleMap>
        </Box>

      </Flex>

    </>

  )
}

export default App



