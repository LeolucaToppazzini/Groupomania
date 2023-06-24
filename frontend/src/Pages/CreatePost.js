import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

function CreatePost() {
    const [data, setDate] = useState([]);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setPost] = useState("");
    const [image, setImage] = useState(null);

    const postData = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("user_id", localStorage.getItem("userId")); // Aggiunta di user_id

        const jwtToken = localStorage.getItem("sessionToken");

        axios
            .post("http://localhost:8080/api/tutorials", formData, {
                headers: {
                    authorization: 'Bearer '+ jwtToken, // Aggiungi il token JWT negli header
                },
            })
            .then((res) => console.log("posting data", res))
            .catch((err) => console.log(err));
        navigate("/");
    };

    return (
        <form onSubmit={postData} className="flex-container">
            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>

            <label>
                Image:
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </label>

            <label>

                <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setPost(e.target.value)}
                    name="postContent"
                    rows={4}
                    cols={40}
                />
            </label>

            <input type="submit" />
        </form>
    );
}

export default CreatePost;
