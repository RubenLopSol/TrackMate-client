import { useContext } from 'react'
import { packageContext } from "../../context/packages.context"


function SelectedPackages() {
    const { driverPackages } = useContext(packageContext)
    return (
        <div >
            <h2 className="mb-2">Your day :)</h2>
            <div>
            <table className="table mt-3 border border-5">
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
        </div>
    )
}

export default SelectedPackages;