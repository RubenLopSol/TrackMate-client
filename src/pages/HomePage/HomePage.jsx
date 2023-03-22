import { Link } from "react-router-dom"
import "./index.css";
import Gerard from "./Gerard.JPG"
import Xabi from "./Xabi.JPG"
import Ruben from "./Ruben.JPG"

function Index() {
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg bg-dark sticky-top" data-bs-theme="dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand">TrackMate</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            <li className="nav-item">
                                <Link to="/signup" className="nav-link active" aria-current="page">Sign Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Log In</Link>
                            </li>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="ms-3" style={{ backgroundColor: "white" }}>
                <div className="row col-sm-12">
                    <div className="mt-5">
                        <h3 className="mb-3">Sustainability</h3>
                        <p className="me-5 ms-5">TracMate is committing to becoming a fully electric, zero-emission platform by 2040, with 100% of rides taking place in zero-emission vehicles, on public transit, or with micromobility. It is our responsibility as the largest mobility platform in the world to more aggressively tackle the challenge of climate change. We will do this by offering riders more ways to ride green, helping drivers go electric, making transparency a priority and partnering with NGOs and the private sector to help expedite a clean and just energy transition.</p>
                    </div>
                    <div className="mt-5">
                        <h3 className="mb-3">About us</h3>
                        <p className="me-5 ms-5">We reimagine the way the world moves for the better
                            Movement is what we power. It’s our lifeblood. It runs through our veins. It’s what gets us out of bed each morning. It pushes us to constantly reimagine how we can move better. For you. For all the places you want to go. For all the things you want to get. For all the ways you want to earn. Across the entire world. In real time. At the incredible speed of now.</p>
                        <div className="row mb-5 mt-5">
                            <div className="col-md-4 m-auto">
                                <h4>Gerard Bové Tous</h4>
                                <img src={Gerard} className="rounded-circle w-50 h-75" alt="Gerard"></img>
                            </div>
                            <div className="col-md-4 m-auto">
                                <h4>Rubén López Solé</h4>
                            </div>
                            <div className="col-md-4 m-auto">
                                <h4>Xabier Naseem Mohammad</h4>
                                <img src={Xabi} className="rounded-circle w-50 h-75" alt="Xabi"></img>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
            <footer style={{ backgroundColor: "black", color: "white", padding: "20px" }}>
                <p>First Published: March-17-2023 © 2023 TrackMate.com All rights reserved for Gerard Bové, Rubén López & Xabier Naseem Mohammad.</p>
            </footer>

        </>
    )
}

export default Index;