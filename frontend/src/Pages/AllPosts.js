import axios from "axios";
import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import moment from "moment";

function AllPosts() {
    const API_URI = 'http://localhost:8080/api/tutorials'
    const [profile, setProfile] = useState([])
    const [clearLocalStorage, setClearLocalStorage] = useState(false);
    const navigate = useNavigate();
    const [viewedPosts, setViewedPosts] = useState([]);
    const [viewedPostIds, setViewedPostIds] = useState({});




    useEffect(() => {

        getProfiles();
    }, [viewedPostIds]);

    function formatDateTime(dateTime) {
        return moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
    }



    const handlePostView = async (articleId) => {
        const userId = localStorage.getItem("userId");
        const jwtToken = localStorage.getItem("sessionToken");

        const requestData = {
            user_id: parseInt(userId), // Converto l'ID dell'utente in un numero intero
            tutorial_id: parseInt(articleId), // Converto l'ID dell'articolo in un numero intero
        };

        try {
            await axios.post("http://localhost:8080/api/viewposts", requestData, {
                headers: {
                    authorization: `Bearer ${jwtToken}`,
                },
            });
            console.log("Record created: viewpost");
            setViewedPostIds(requestData);

        } catch (error) {
            console.error("Error creating record: viewpost", error);
        }
    };






    const handleClearLocalStorage = () => {
        localStorage.clear();
        setClearLocalStorage(true);
        navigate("/users/login");
    }
    const deleteUser = async () => {
        const id = localStorage.getItem("userId");
        const jwtToken = localStorage.getItem("sessionToken");
        try {
            const res = await axios.delete('http://localhost:8080/api/users/delete/' + id, {
                headers: {
                    authorization: 'Bearer '+ jwtToken,
                },
            });
            console.log('Item successfully deleted.')
        } catch (error) {
            alert(error)
        }
        handleClearLocalStorage()
    }



    const getProfiles = async () => {
        const jwtToken = localStorage.getItem("sessionToken");
        try {

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

        const viewpostData = await axios.get("http://localhost:8080/api/viewposts",{
            headers: {
                authorization: 'Bearer ' + jwtToken,
            },
        });
        setViewedPosts(viewpostData.data);
        console.log(viewpostData.data);
    }

    /*
    useEffect(() => {
        window.addEventListener('load', getProfiles)
        return () => {
            window.removeEventListener('load', getProfiles)
        }
    }, [profile])

     */



    useEffect(() => {
        if (clearLocalStorage) {
            localStorage.clear();
            setClearLocalStorage(false);
        }
    }, [clearLocalStorage]);

    return (
        <div className="flex-container">
            <h2 className="mb-4">All posts</h2>
            <button className="original-button" onClick={handleClearLocalStorage}>Logout</button>
            <button className="original-button" onClick={deleteUser}>Delete user</button>
            {profile.map((res) => {
                const isViewed = viewedPosts.some(
                    (viewpost) =>
                        viewpost.tutorial_id === res.id &&
                        viewpost.user_id === parseInt(localStorage.getItem("userId"))
                );
                console.log(res)
                return (

                        <div className="card-body" key={res.id}>
                            <h2 className="card-title">{res.title}</h2>
                            <h3 className="mb-4">{res.user.email}</h3>

                            <h4 className="card-text">{formatDateTime(res.createdAt)}</h4>
                            <h4 className="card-text">{res.description}</h4>
                            {res.image_url !== 'default-image.jpg' ? (
                                <img src={res.image_url} alt="CodingDS IMG" />
                            ) : null}
                            <button className="original-button"
                                onClick={() => handlePostView(res.id)}
                                disabled={isViewed} // Disabilita il pulsante se l'articolo è già stato visualizzato
                            >
                                {isViewed ? "Post already visualized" : "Visualized post"}
                            </button>
                        </div>

                )
            })}
        </div>
    )
}

export default AllPosts;