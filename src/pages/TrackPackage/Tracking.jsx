import { useState, useEffect } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import truck from "./truck.png"
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

function Tracking() {
    const [coordenadas, setCoordenadas] = useState({})
    const [identificador, setIdentificador] = useState(null)
    const {idpackage} = useParams()
    const navigate = useNavigate();

    const stop = () => {
         clearInterval(identificador)
         setIdentificador(null)
         navigate("/profile")
    }
    const image = truck;
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + `/package/pack/${idpackage}`)
        .then(result => {

            setCoordenadas(result.data.driverAssigned.driverCoordinates)
        })
        setIdentificador(setInterval(() => {
            axios.get(process.env.REACT_APP_SERVER_URL + `/package/pack/${idpackage}`)
                .then(result => {
                
                    setCoordenadas(result.data.driverAssigned.driverCoordinates)
                })
        }, 10000))
        return (
            clearInterval(identificador)
        )
    }, [])

    return (
        <div >
            <button className="btn btn-primary mt-2 mb-2" onClick={stop}>Go back</button>
            <Flex
                position='relative'
                flexDirection='column'
                alignItems='center'
                h='100vh'
                w='100vw'
            >
                <Box position='absolute' left={50} top={70} h='100%' w='100%'>
                    <GoogleMap
                        center={coordenadas}
                        zoom={15}
                        mapContainerStyle={{ width: '80%', height: '50%' }}
                        options={{
                            zoomControl: true,
                            mapTypeControl: true,
                        }}
                    >
                        <Marker position={coordenadas} icon={image} />
                    </GoogleMap>
                </Box>
            </Flex>
        </div>)
}
export default Tracking;
