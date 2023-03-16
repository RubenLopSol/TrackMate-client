import { useContext } from 'react'
import { packageContext } from "../../context/packages.context"
import { Link } from "react-router-dom";

function SelectedPackages() {
    const { driverPackages } = useContext(packageContext)
    return (
        <>
        <h2 className="mb-2">Plan your day :)</h2>
        <div>
        <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">Tracking number</th>
                        <th scope="col">Address</th>
                    </tr>
                </thead>
                {driverPackages.map(packs => {
                    return (
                        <tbody key={packs._id}>
                            <tr>
                                <td>{packs._id}</td>
                                <td>{packs.address}</td>
                            </tr>
                        </tbody>
                    )
                })}
            </table>
        </div>
        </>
    )
}

export default SelectedPackages;