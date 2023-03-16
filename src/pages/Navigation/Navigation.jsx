import { Box, Button, ButtonGroup, Flex, IconButton, Input, Text } from '@chakra-ui/react'
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import { useRef, useState, useContext } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import camion from "./camion.png"
import { packageContext } from '../../context/packages.context'
import SelectedPackages from "../../components/SelectedPackages/SelectedPackages"


const center = { lat: 41.392478, lng: 2.144170 }
const image = camion;

function Navigation() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyB-bxisiqGND7MJCIQkaE7bbu2bjGSCC0g',
    libraries: ['places'],
  })


  const [map, setMap] = useState((null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const { driverPackages } = useContext(packageContext)

  const originRef = { lat: 41.392478, lng: 2.144170 }
  const waypointsRef = [{ lat: driverPackages[0].coordinates.lat, lng: driverPackages[0].coordinates.lng }]
  const destinationRef = { lat: 41.392478, lng: 2.144170  }
  console.log("waypoints", waypointsRef)

  console.log("driverPackagesNavigation", driverPackages)


  /*  const [identificador, setIdentificador] = useState(null)
   const location = function () {
       if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(position);
       }
   }
   const position = function (pos) {
       setCoordenadas({
           lat: pos.coords.latitude,
           lng: pos.coords.longitude
       });
       
       console.log("pos", pos.coords)
   }
   const stop = () => {
       clearInterval(identificador)
       setIdentificador(null)
   }
   const image = truck;
    useEffect(() => {
       location();
       setIdentificador(setInterval(() => {
           location();
           console.log("hola")
       }, 10000))
       return (
           clearInterval(identificador)
       )
   }, [])
*/
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




  return (
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
        <SelectedPackages/>
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
        <div spacing={2}>        

          <ButtonGroup>
            <Button type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
          </ButtonGroup>
        </div>

      </Box>
    </Flex>
  )
}

export default Navigation;



