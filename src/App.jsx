import {useState} from 'react'
import Presupuesto from './components/Presupuesto'
import Login from './components/login/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
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
    if(!token){
        return <Login setToken={setToken}/>
    }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Presupuesto/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
