import {Box, Button, ButtonGroup, Flex, IconButton, Input, Text} from '@chakra-ui/react'
import {useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer} from '@react-google-maps/api'
import { useRef, useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import camion from "./camion.png"

const center = { lat: 41.392478,  lng: 2.144170}
const image = camion;

function Navigation () {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyB-bxisiqGND7MJCIQkaE7bbu2bjGSCC0g',
    libraries: ['places'],
  }) 

  const [map, setMap] = useState((null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [position, setPosition] = useState()
  const [coordenadas, setCoordenadas] = useState({})
  const [identificador, setIdentificador] = useState(null)
  const location = function () {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      }
  }
  const showPosition = function (pos) {
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

  const originRef = useRef()
  const waypointsRef = useRef()
  const destinationRef = useRef()
  console.log("waypoints", waypointsRef)
  console.log("origen", originRef)
  
 /*  if (!isLoaded) {
    return <p>Loading...</p>
  } */

   /*     useEffect(() => {
        location();
        setIdentificador(setInterval(() => {
            location();
            console.log("hola")
        }, 10000))
        return (
            clearInterval(identificador)
        )
    }, []) */

  async function calculateRoute() {
    if (originRef.current.value === ''|| destinationRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    
    const results = await directionsService.route({
      origin: originRef.current.value,
      waypoints: [
        {
          // eslint-disable-next-line no-undef
            location: waypointsRef.current.value
            
        },
    ],
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
      
      
    })
    
    
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)

  }


  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destinationRef.current.value = ''

  }

  return (
    <>
    <Navbar/>
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
     
        <GoogleMap
          center={coordenadas}
          zoom={40}
          mapContainerStyle={{ width: '50%', height: '50%' }}
          options={{
            zoomControl: true,
            mapTypeControl: true,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={coordenadas} icon={image}/>
          
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
        <div spacing={2}>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Waypoints'
                ref={waypointsRef}
              />
            </Autocomplete>
          </Box>
          
          <Box>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destinationRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              
              onClick={clearRoute}
            />
          </ButtonGroup>
        </div>
        <div spacing={4} mt={4}>
          <p>Distance: {distance} </p>
          <p>Duration: {duration} </p>
          <IconButton
            aria-label='center back'
            
            isRound
            onClick={() => {
            map.setZoom(40)
            }}
          />
        </div>
      </Box>
    </Flex>
  </>
  )
}

export default Navigation;