import React,{useState,useContext,useEffect} from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {

    const {token,setToken} = useContext(UserContext)
    const [joke,setJoke] = useState("")
    const [name,setName] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        if(token==""){
            let token_from_local_storage = localStorage.getItem("token")
            if(token_from_local_storage){
                setToken(token_from_local_storage)
            }
            else {
                navigate("/login")
            }
        }
    },[])

    useEffect(()=>{
        getzuku()
    },[token])

    function getzuku() {
        axios.get("https://instagram-express-app.vercel.app/api/auth/zuku" , {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then(response =>{
            setJoke(response.data.data.message)
            setName(response.data.data.user.name)
        })
        .catch(error => alert(error.response.data.message))
    }


    async function logout() {
        try{
            const response = await axios.delete("https://instagram-express-app.vercel.app/api/auth/logout",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setJoke("")
            setName("")
            setToken("")
            alert("User Logged Out Successfully")


            //delete token from local storage
            localStorage.removeItem("token")


            navigate("/login")
        }
        catch(error) {
            alert(error.response.data.message)
        }
    }



    return(
        <div>
            <h1>Welcome {name}</h1>
            <button onClick={getzuku}>Get Joke</button>
            {
                joke && <p>{joke}</p>
            }
            <button onClick={logout}>Logout</button>

        </div>
    )

}


export default Dashboard;