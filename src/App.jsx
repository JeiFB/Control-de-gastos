import {useState} from 'react'
import Presupuesto from './components/Presupuesto'
import Login from './components/login/Login'
import Register from './components/login/Register'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import useToken from './helpers/useToken'

// function setToken(emailToken){
//     sessionStorage.setItem('token', JSON.stringify(emailToken));
// }
// function getToken(){
//     const tokenString = sessionStorage.getItem('token');
//     const userToken = JSON.parse(tokenString);
//     return userToken?.token;
// }

function App() {
    const {token, setToken} = useToken();

    if(!token) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login setToken={setToken}/>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Presupuesto setToken={setToken}/>}/>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
