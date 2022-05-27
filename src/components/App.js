import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Login from "./Login";
import Register from "./Register";



export const MainContext = createContext();

export default function App(){

    const[token, setToken]= useState(null);

    return(
        <BrowserRouter>
            <MainContext.Provider value ={{token, setToken}}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Register />} />
                </Routes>
            </MainContext.Provider>
        </BrowserRouter>
    )
}