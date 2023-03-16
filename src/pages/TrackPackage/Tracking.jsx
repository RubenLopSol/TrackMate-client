import { useState, useEffect } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import truck from "./truck.png"
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Tracking() {
    const [coordenadas, setCoordenadas] = useState({})
    const [identificador, setIdentificador] = useState(null)

    const {idpackage} = useParams()

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
    }
    const stop = () => {
        clearInterval(identificador)
        setIdentificador(null)
    }
    const image = truck;
     useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + `/package/pack/${idpackage}`)
        .then(result => {
            console.log("DATOS PACKETE: ", result.data.driverAssigned.driverCoordinates)
            setCoordenadas(result.data.driverAssigned.driverCoordinates)
        })
        setIdentificador(setInterval(() => {
            axios.get(process.env.REACT_APP_SERVER_URL + `/package/pack/${idpackage}`)
                .then(result => {
                    console.log("DATOS PACKETE: ", result.data.driverAssigned.driverCoordinates)
                    setCoordenadas(result.data.driverAssigned.driverCoordinates)
                })
        }, 10000))
        return (
            clearInterval(identificador)
        )
    }, [])

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
export default Tracking;