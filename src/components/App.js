import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Habits from "./Habits";
import Today from "./Today";
import History from "./History";



export const MainContext = createContext();

export default function App(){

    const[token, setToken]= useState(null);
    const [countHabitDone, setCountHabitDone]= useState(0);
    const[image, setImage]= useState("");

    return(
        <BrowserRouter>
            <MainContext.Provider value ={{token, setToken, countHabitDone, setCountHabitDone,image,setImage}}>
                <Routes>
                    <Route path="/" element={<Login  />} />
                    <Route path="/cadastro" element={<Register />} />
                    <Route path="/hoje" element = {<Today/>} />
                    <Route path = "/habitos" element ={<Habits/>} />
                    <Route path="/historico" element ={<History/>}  />
                </Routes>
            </MainContext.Provider>
        </BrowserRouter>
    )
}