import React,{useState} from "react";
import { Route,Routes } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import "./style.css"


const App = () => {


  const [token, setToken] = useState("")

  return(
    <div>
       <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
       </Routes>
    </div>
  )
}


export default App;