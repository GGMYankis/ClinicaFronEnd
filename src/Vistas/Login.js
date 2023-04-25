
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
//import { Navigate, Outlet } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link, Redirect, Form, useNavigate } from 'react-router-dom';
import { Landing, Usuario } from '../pages/paginas';
import { Protect } from '../components/Protect';
import logo from "../imagenes/IMG-20230221-WA0009.png";
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import { FaFontAwesomeIcon, FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import jwt_decode from 'jwt-decode';
import { deleteToken, getToken, initAxiosInterceptors, setUsuarioM, setUsuario ,getDatosUsuario,setToken} from '../auth-helpers'


function Login() {

    const login = document.getElementById("login")
    const cookies = new Cookies();
    const [email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState(false)
    const [valiEmail, setValiEmail] = useState(false)
    const [mensajeError, setMensajeError] = useState(false)



    const [text, setText] = useState(

        window.localStorage.getItem('text')

    );

    const navigation = useNavigate();

    const handleNameChange = (value) => {
        setEmail(value);
    }


    const handlePhoneNoChange = (value) => {
        setPassword(value);
    }


    const handleLogin = async (e) => {

        e.preventDefault()

        if (email.length == 0 || Password.length == 0) {

            setError(true)

            return;

        }

        var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

        var esValido = expReg.test(email);

        if (esValido == true) {

        } else {
            setValiEmail(true)
            return;
        }
//  "homepage": "https://clinica14.000webhostapp.com/",
        const data = {
            Email: email,
            Password: Password
        };


        const url = 'https://localhost:63958/api/Autenticacion/Login';

        axios.post(url, data).then((result) => {
     
            if (result.data.user == null) {
                setError(result.data.message)
            }else{
                navigation("/admin")
            }

            const user = result.data.user.names.substring('', 1)
            setUsuarioM(user)
            setUsuario(result.data.user.idUser)
            setToken( result.data.tokencreado)
            login.reset()
        })

    }



    return (

        <div className='contenedor_login3'>
            <form className='hhh' onSubmit={handleLogin} id="login">
                <img className='img3' src={logo} /><br></br>


                <span className='verL'><span className='ggL'>É</span>nfasis</span>

                <div className='cont-email-login' >
                    <FontAwesomeIcon icon={faEnvelope} className='email' />
                    <input type="text" placeholder='Email' onChange={(e) => handleNameChange(e.target.value)} />
                </div>

                {error & email.length <= 0 ?
                    <label className='campo-login'>Este campo es requerido</label> : ""}

                {valiEmail ?

                    <label className='campo-login'>La dirección del correo no es válida</label> : ""}

                <div className='cont-email-login' >
                    <FontAwesomeIcon icon={faLock} className='email' />
                    <input type="password" placeholder='Password' onChange={(e) => handlePhoneNoChange(e.target.value)} />
                </div>

                {error && Password.length <= 0 ?
                    <label className='campo-login'>Este campo es requerido</label> : ""}

                {error ?
                    <label className='campo-login'>{error}</label> : ""}

                <button className='btn'>Login</button>
            </form>




        </div >
    )
}

export default Login;


