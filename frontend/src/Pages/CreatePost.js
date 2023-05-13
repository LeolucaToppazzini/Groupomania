import axios from "axios";
import {useEffect,useState} from "react";

function CreatePost() {
    const [data, setDate] = useState([])

    const [title, setTitle] = useState('')
    const [description, setPost] = useState('')
    const [file, setFile] = useState('')

    /*
      useEffect(() => {
        axios.get('http://192.168.56.1:8080/api/users/3')
            .then(res => {
              console.log("gettin from ::::",res.data)
              setDate(res.data)

            }).catch(err => console.log(err))
      }, [])
      */

    const postData = (e) => {
        e.preventDefault();
        axios.post('https://jsonplaceholder.typicode.com/posts',{
                title,
                description,
                file

            }

        ).then(res => console.log('posting data', res)).catch(err => console.log(err))
    }



    return (
        <form onSubmit={postData}>
            <label>Title:
                <input
                    type="text"

                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>

            <label>image:
                <input
                    type="file"

                    value={file}
                    onChange={(e) => setFile(e.target.value)}
                />
            </label>

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

export default CreatePost;