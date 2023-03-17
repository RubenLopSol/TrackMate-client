import camion from "./camion.jpeg"

function TransportProfile() {
    return (
        <>
            <div className="card text-bg-dark mt-5">
                <img className="card-img" src={camion} alt="Camion"></img>
            </div>
        </>
    )
}

export default TransportProfile;