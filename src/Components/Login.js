import React, { useState,useContext ,useEffect} from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userInput, setUserInput] = useState({ email: "", password: "" });

  let { email, password } = userInput;

  const {token,setToken} =useContext(UserContext)

  const navigate = useNavigate()

  useEffect(()=>{
    if(token ||localStorage.getItem("token")) {
      navigate("/dashboard")
    }
  },[])

  function updateInput(e) {
    let x = e.target.name;
    setUserInput({ ...userInput, [x]: e.target.value });
  }

  async function implementSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    } else {
      try {
        const response = await axios.post(
          "https://instagram-express-app.vercel.app/api/auth/login",
          { email, password }
        );
        console.log(response.data);

        setToken(response.data.data.token)
        console.log(response.data.data.token);


        setUserInput({ email: "", password: "" });



        localStorage.setItem("token" , response.data.data.token)


        alert("Login Succesfully");
        navigate("/dashboard")

      } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message)
      }
    }
  }

  return (
    <div>
        <h1>Login</h1>
      <form onSubmit={implementSubmit}>
        <input type="email" placeholder="Email" name="email" onChange={updateInput} value={email} />
        <input type="password" placeholder="Password" name="password" onChange={updateInput} value={password} />
        <button type="submit">Submit</button>
      </form>
      
    </div>
  );
};

export default Login;
