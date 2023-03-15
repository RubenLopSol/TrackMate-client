import { Link } from "react-router-dom"
import "./index.css";
import Gerard from "./Gerard.JPG"
import Xabi from "./Xabi.JPG"
import Ruben from "./Ruben.JPG"
import Video from "./video.mp4"
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
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Company
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item">About us</Link></li>
                                        <li><Link className="dropdown-item">Our ideas</Link></li>
                                        <li><Link className="dropdown-item">Follow us</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link">Help</Link>
                                </li>
                            </ul>
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
            <body style={{ backgroundColor: "white" }}>
                <div>
                    <h3>Sustainability</h3>
                    <p>Sustainability
                        Uber is committing to becoming a fully electric, zero-emission platform by 2040, with 100% of rides taking place in zero-emission vehicles, on public transit, or with micromobility. It is our responsibility as the largest mobility platform in the world to more aggressively tackle the challenge of climate change. We will do this by offering riders more ways to ride green, helping drivers go electric, making transparency a priority and partnering with NGOs and the private sector to help expedite a clean and just energy transition.</p>
                </div>
                <div>
                    <h3>About us</h3>
                    <p>We reimagine the way the world moves for the better
                        Movement is what we power. It’s our lifeblood. It runs through our veins. It’s what gets us out of bed each morning. It pushes us to constantly reimagine how we can move better. For you. For all the places you want to go. For all the things you want to get. For all the ways you want to earn. Across the entire world. In real time. At the incredible speed of now.</p>
                    <div className="row">
                        <div className="col-md-4">
                            <h4>Gerard Bové Tous</h4>
                            <img src={Gerard} className="rounded-circle w-50 h-75" alt="Gerard"></img>
                        </div>
                        <div className="col-md-4">
                            <h4>Rubén Lopez Solé</h4>
                            <img src={Ruben} className="rounded-circle w-50 h-75" alt="Ruben"></img>
                        </div>
                        <div className="col-md-4">
                            <h4>Xabier Naseem Mohammad</h4>
                            <img src={Xabi} className="rounded-circle w-50 h-75" alt="Xabi"></img>
                        </div>
                    </div>
                </div>
                <br></br>

            </body>
            <footer style={{ backgroundColor: "black", color: "white", padding: "20px" }}>

            </footer>

        </>
    )
}

export default Index;