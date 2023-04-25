
import React from 'react'
import { BrowserRouter, Routes, Route, Link, Redirect } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import logo from "./imagenes/IMG-20230221-WA0009.png";
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { setUsuarioM, obtenerUser,getNombreUsuario, deleteToken } from './auth-helpers'



function Headers({ }) {

    const navigation = useNavigate();

    

    obtenerUser()
 
    const logout = () => {

        deleteToken()
        navigation("/login")
    }
    
    const myElement = useRef(null);

    const handleClick = () => {
        myElement.current.classList.toggle('mi-clase-css');
    };


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
                                <Link className='letras-menu' to="/TerapiaTerapeuta">Asignación</Link>
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
                <div className='contenedor-botones'>
                    <div className='cont-btn-headers'>
                        <div className='probarUs'>
                            <Link className='Link' to="/perfilAdmin">{obtenerUser()}</Link>
                        </div>
                    </div>
                    <div className='cont-nombre-usuario'>
                        <p className='nombreUsuario'>{getNombreUsuario()}</p>
                    </div>
                </div>

            </header>
        </div>
    )
}

export default Headers
