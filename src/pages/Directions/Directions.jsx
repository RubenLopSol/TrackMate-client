import { useState, useEffect } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import truck from "./truck.png"
function Directions() {
    const [coordenadas, setCoordenadas] = useState({})
    const [identificador, setIdentificador] = useState(null)
    const location = function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position);
        }
    }
    const position = function showPosition(position) {
        position = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
console.log("posicion" , position)
        setCoordenadas(position);
    }
    const stop = () => {
        clearInterval(identificador)
        setIdentificador(null)
    }
    const image = truck;
/*     useEffect(() => {
        setIdentificador(setInterval(() => {
            location();
            console.log("hola")
        }, 10000))
        return (
            clearInterval(identificador)
        )
    }, [])
 */
    return (
        <>
            <button onClick={stop}>Stop</button>
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
                        zoom={15}
                        mapContainerStyle={{ width: '50%', height: '50%' }}
                        options={{
                            zoomControl: true,
                            mapTypeControl: true,
                        }}
                    >
                        <Marker position={coordenadas} icon={image} />
                    </GoogleMap>
                </Box>
            </Flex>
        </>)
}
export default Directions;