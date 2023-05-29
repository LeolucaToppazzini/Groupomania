import axios from "axios";
import {useEffect,useState} from "react";

function AllPosts() {



    const [description, setPost] = useState('')



    const postData = (e) => {
        e.preventDefault();
        axios.post('https://jsonplaceholder.typicode.com/posts',{

                description,


            }

        ).then(res => console.log('posting data', res)).catch(err => console.log(err))
    }



    return (
        <form onSubmit={postData}>


            <label>
                Edit your post:
                <textarea
                    value={description}
                    onChange={(e) => setPost(e.target.value)}
                    name="postContent"
                    defaultValue=" "
                    rows={4}
                    cols={40}
                />
            </label>





            <input type="submit" />
        </form>

    );
}

export default AllPosts;