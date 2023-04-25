
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
import { deleteToken, getToken, initAxiosInterceptors, setUsuarioM, setUsuario, getDatosUsuario,setUsuarioCompleto, setToken, nombreUsuario } from '../auth-helpers'


function Login() {

    const login = document.getElementById("login")
    const cookies = new Cookies();
    const [email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState(false)
    const [valiEmail, setValiEmail] = useState(false)
    const [mensajeError, setMensajeError] = useState(null)

    
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

            setMensajeError('Debe de llenar los campos')

            return;

        }

        var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

        var esValido = expReg.test(email);

        if (esValido == true) {

        } else {
           setMensajeError('La dirección del correo no es válida')
            return;
        }
        //  "homepage": "https://clinica14.000webhostapp.com/",
        const data = {
            Email: email,
            Password: Password
        };


        const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/Autenticacion/Login';

        axios.post(url, data).then((result) => {

            console.log(result.data.user)

            if (result.data.user == null) {
                setMensajeError(result.data.message)
            } else {
                navigation("/admin")
            }

            const user = result.data.user.names.substring('', 1)
            setUsuarioM(user)
            setUsuario(result.data.user.idUser)
            nombreUsuario(result.data.user.names)
            setToken(result.data.tokencreado)
            setUsuarioCompleto(result.data.user.idRol)
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
                    <input type="text" placeholder='Email' onChange={(e) => handleNameChange(e.target.value)} autoComplete='off' />
                </div>

                {error & email.length <= 0 ?
                    <label className='campo-login'>Este campo es requerido</label> : ""}

                {valiEmail ?

                    <label className='campo-login'>La dirección del correo no es válida</label> : ""}

                <div className='cont-email-login' >
                    <FontAwesomeIcon icon={faLock} className='email' />
                    <input type="password" placeholder='Password' onChange={(e) => handlePhoneNoChange(e.target.value)} autoComplete='off' />
                </div>

                {error && Password.length <= 0 ?
                    <label className='campo-login'>Este campo es requerido</label> : ""}

                {error ?
                    <label className='campo-login'>{error}</label> : ""}
                {mensajeError ?
                    <div class="alert alert-danger" role="alert">
                      {mensajeError}
                    </div>
                    : ""
                }

                <button className='btn'>Login</button>
            </form>




        </div >
    )
}

export default Login;


