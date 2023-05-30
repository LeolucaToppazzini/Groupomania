import axios from "axios";
import {useEffect,useState} from "react";

function AllPosts() {
    const API_URI = 'http://localhost:8080/api/tutorials'
    const [profile, setProfile] = useState([])
    const getProfiles = async () => {
        try {
            const fetchData = await axios.get(API_URI, {
                headers: {
                    authorization: 'Bearer JWT Token',
                },
            })
            setProfile(fetchData.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        window.addEventListener('load', getProfiles)
        return () => {
            window.removeEventListener('load', getProfiles)
        }
    }, [profile])
    return (
        <div className="container mt-4">
            <h2 className="mb-4">React Axios HTTP GET Request Example</h2>
            {profile.map((res) => {
                return (
                    <li
                        className="card "
                        key={res.id}
                    >
                        <div className="card-body">
                            <h5 className="card-title">{res.title}</h5>
                            <h5 className="card-text">{res.description}</h5>
                            <img src={res.image} alt="CodingDS IMG"></img>
                        </div>
                    </li>
                )
            })}
        </div>
    )
}

export default AllPosts;