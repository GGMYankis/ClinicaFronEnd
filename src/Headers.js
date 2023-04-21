
import React from 'react'
import { BrowserRouter, Routes, Route, Link, Redirect } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import logo from "./imagenes/IMG-20230221-WA0009.png";
import { FaUser } from 'react-icons/fa';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { deleteToken, getToken, initAxiosInterceptors, setUsuarioM, obtenerUser } from './auth-helpers'


function Headers({ }) {

    const cookies = new Cookies();
    const navigation = useNavigate();
    const [usuario, setUsuario] = useState(null)


    obtenerUser()


    const logout = () => {

        cookies.remove("MyCookies")
        cookies.remove("Perfil")
        cookies.remove("Usuario")
        navigation("/login")
    }


    const myElement = useRef(null);

    const handleClick = () => {
        myElement.current.classList.toggle('mi-clase-css');
    };


    useEffect(() => {
        const na = cookies.get('name')

    }, [])


    return (
        <div>

            <header className='encabezado'>
                <div>
                    <nav>
                        <input type="checkbox" id="check" onClick={handleClick} />
                        <label for="check" class="checkbtn">
                            <FaBars id='bar' />
                        </label>

                        <ul>
                            <li>
                                <Link className='letras-menu' to="/admin">Paciente de ingreso</Link>
                            </li>
                            <li>
                                <Link className='letras-menu' to="/evaluacion">Evaluación</Link>
                            </li>
                            <li>
                                <Link className='letras-menu' to="/terapia">Crear terapia</Link>
                            </li>
                            <li>
                                <Link className='letras-menu' to="/listasPacientes">Listado de Pacientes</Link>
                            </li>
                            
                            <li>
                                <Link className='letras-menu' to="/listasTerapias">Listado de Terapias</Link>
                            </li>
                            <li>
                                <Link className='letras-menu' to="/asistencias">Asistencia</Link>
                            </li>
                            <li>
                                <Link className='letras-menu' to="/calendario">Calendario</Link>
                            </li>

                            <li>
                                <a className='Cerra-Sesion-ul' onClick={logout}>Cerra Sesión</a>
                            </li>
                            

                        </ul>
                    </nav>
                </div>

                <div className='cont-logo-header'>
                    <img className='img-admin-logo' src={logo} />
                    <span className='ver'><span className='gg'>é</span>nfasis</span>
                </div>

                <div className='cont-btn-headers'>
                    <div className='probarUs'>
                        <Link className='Link' to="/perfilAdmin">{obtenerUser()}</Link>
                    </div>

                   
                </div>


            </header>

            <div class="lds-roller"><div></div><div></div><div></div><div></div>
            <div></div><div></div><div></div><div></div></div>


        </div>
    )
}

export default Headers
