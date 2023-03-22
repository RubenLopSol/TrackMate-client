import { Box, Button, ButtonGroup, Flex } from '@chakra-ui/react'
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api'
import { useState, useContext, useEffect } from 'react'
import axios from "axios"

import { packageContext } from '../../context/packages.context'
import { AuthContext } from '../../context/auth.context'
import SelectedPackages from "../../components/SelectedPackages/SelectedPackages"
import {Link} from "react-router-dom"


const center = { lat: 41.392478, lng: 2.144170 }

function Navigation() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyB-bxisiqGND7MJCIQkaE7bbu2bjGSCC0g',
    libraries: ['places'],
  })


  const [map, setMap] = useState((null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const { driverPackages } = useContext(packageContext)
  const { user } = useContext(AuthContext)

  const [coordenadas, setCoordenadas] = useState({})
  const [identificador, setIdentificador] = useState(null)

  const location = function () {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position);
      }
  }

  const position = function (pos) {
    setCoordenadas({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
    })
  }

  useEffect(() => {
    location();
    setIdentificador(setInterval(() => {
        location();
        
        
    }, 5000))
    return (
        clearInterval(identificador)
        
    )
  }, [])
  console.log("COORDENADAS: ", coordenadas)
  axios.put(process.env.REACT_APP_SERVER_URL + `/user/edit/${user._id}`, { driverCoordinates: coordenadas })
        .then(result => console.log(result))
        .catch(err => console.log(err))
/*   const originRef = { lat: 41.392478, lng: 2.144170 }
  const waypointsRef = [{ lat: driverPackages[0].coordinates.lat, lng: driverPackages[0].coordinates.lng }]
  const destinationRef = { lat: 41.392478, lng: 2.144170  } */



async function calculateRoute() {
        // eslint-disable-next-line no-undef
  const directionsService = new google.maps.DirectionsService();

  const waypoints = driverPackages.map((pack) => {
    return {
      location: {
        lat: pack.coordinates.lat,
        lng: pack.coordinates.lng,
      },
    };
  });

  const results = await directionsService.route({
    origin: { lat: 41.392478, lng: 2.144170 },
    waypoints: waypoints,
    destination: { lat: 41.392478, lng: 2.144170 },
          // eslint-disable-next-line no-undef
    travelMode: google.maps.TravelMode.DRIVING,
  });

  setDirectionsResponse(results);
}

const clickHandler = () => {
  clearInterval(identificador)
  driverPackages.forEach((pack) => {
    axios.put(process.env.REACT_APP_SERVER_URL + `/package/${pack._id}/edit`, {isTransported: "Delivered"})
      .then((result) => {
        /* console.log("result", result); */
      })
      .catch((err) => {
        console.log(err);
      });
  })
};

  return (
    <>
    <div>
    <Link className="btn btn-info btn-lg btn-block mt-4" to ="/profile" onClick={clickHandler}>Finish your day!</Link>
    </div>
    <div className="row">
    <div className="col-sm-7 mt-5 ms-5 ">
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='150%' w='100%'>

        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '50%', height: '50%' }}
          options={{
            zoomControl: true,
            mapTypeControl: true,
          }}
          onLoad={map => setMap(map)}
          
        >
          <Marker position={center} />
          {driverPackages.map((pack) => (
  <Marker key={pack._id} position={{ lat: pack.coordinates.lat, lng: pack.coordinates.lng }} />
))}


          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
        
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >

      </Box>
      
    </Flex>
    </div>
    <div className="col-sm-4 me-2 mt-5 border border-5" >
    <SelectedPackages />
    <div spacing={2}>        

          <ButtonGroup>
            <Button type='submit' className="btn btn-info btn-lg btn-block" onClick={calculateRoute}>
              Calculate Route
            </Button>
          </ButtonGroup>
        </div>
    </div>
    </div>

 
    </>
    
  )
}

export default Navigation;