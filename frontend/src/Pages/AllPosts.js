import axios from "axios";
import {useEffect,useState} from "react";

function AllPosts() {
    const API_URI = 'http://localhost:8080/api/tutorials'
    const [profile, setProfile] = useState([])
    const [clearLocalStorage, setClearLocalStorage] = useState(false);



    const handleClearLocalStorage = () => {
        localStorage.clear();
        setClearLocalStorage(true);
    }
    const deleteUser = () => {

    }



    const getProfiles = async () => {
        try {
            const jwtToken = localStorage.getItem("sessionToken");
            const fetchData = await axios.get(API_URI, {
                headers: {
                    authorization: 'Bearer '+ jwtToken,

                },
            })
            setProfile(fetchData.data)
            console.log(fetchData.data)
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

    useEffect(() => {
        if (clearLocalStorage) {
            localStorage.clear();
            setClearLocalStorage(false);
        }
    }, [clearLocalStorage]);

    return (
        <div className="flex-container">
            <h2 className="mb-4">All posts</h2>
            <button onClick={handleClearLocalStorage}>Logout</button>
            <button onClick={deleteUser}>Delete user</button>
            {profile.map((res) => {
                console.log(res)
                return (
                    <li
                        className="card"
                        key={res.id}
                    >
                        <div className="card-body">
                            <h2 className="mb-4">{res.user.email}</h2>
                            <h5 className="card-title">{res.title}</h5>
                            <h5 className="card-text">{res.description}</h5>
                             <img src={res.image_url} alt="CodingDS IMG"></img>
                        </div>
                    </li>
                )
            })}
        </div>
    )
}

export default AllPosts;