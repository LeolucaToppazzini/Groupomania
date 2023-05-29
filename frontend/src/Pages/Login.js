//import './App.css';
import axios from "axios";
import {useEffect,useState} from "react";

function Login() {
    const [data, setDate] = useState([])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
        axios.post('http://localhost:8080/api/users/login', {
            email,
            password
        })
            .then(res => {
                const { userId, Token } = res.data;

                // Salvataggio nel Local Storage
                localStorage.setItem("userId", userId);
                localStorage.setItem("sessionToken", Token);

                // Reindirizzamento alla pagina AllPosts.js
                
            })
            .catch(err => console.log(err));
    }



    return (
        <form onSubmit={postData}>
            <label>Email:
                <input
                    type="text"

                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>Password:
                <input
                    type="text"

                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>


            <input type="submit" />
        </form>

    );
}

export default Login;