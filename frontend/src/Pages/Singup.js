//import './App.css';
import axios from "axios";
import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";

function Singup() {
    const [data, setDate] = useState([])
    const navigate = useNavigate();
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
        axios.post('http://localhost:8080/api/users/signup',{
                email,
                password

            }

        ).then(res => console.log('posting data', res)).catch(err => console.log(err))

        navigate("/Login");
    }



    return (
        <div className="flex-container">
            <h2 className="mb-4">singup</h2>
        <form onSubmit={postData} className="flex-container">
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
        </div>
    );
}

export default Singup;