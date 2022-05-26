import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";

export default function App(){
    return(
        <BrowserRouter>
            {/* <Header/> */}
            <Routes>
                <Route  path = "/" element = {<Login/>}/>
                <Route path = "/cadastro" element = {<Register/>} /> 
            </Routes>
        </BrowserRouter>
    )
}