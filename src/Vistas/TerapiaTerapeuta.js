import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Redirect } from 'react-router-dom'
import logo from "../imagenes/IMG-20230221-WA0009.png"
import doctor from "../imagenes/undraw_medicine_b1ol.png"
import { FaBars } from 'react-icons/fa'
import axios from 'axios'
import Select from 'react-select';
import swal from 'sweetalert';
import Headers from '../Headers'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import { findDOMNode } from 'react-dom'
import { FaUser } from 'react-icons/fa'
import { deleteToken, getToken, initAxiosInterceptors, setUsuarioM, setUsuario, getDatosUsuario, setToken } from '../auth-helpers';




function TerapiaTerapeuta() {
  
    const [data, setData] = useState([]);
    const [terapeuta, setTerapeuta] = useState([])
    const [idTerapeuta, setIdTerapeuta] = useState([])
    const [idTerapias, setIdTerapias] = useState([]);

    useEffect(() => {

        axios.get('http://yankisggm-001-site1.ctempurl.com/api/Clinica/terapeuta')

            .then(response => {
                setTerapeuta(response.data.usuarios)
                //  console.log(response.data.usuarios)
            })

        axios.get('http://yankisggm-001-site1.ctempurl.com/api/Clinica/ListaTerapia')
            .then(response => {
                const florw = []
                response.data.map(tera => {
                 florw.push(tera.nombreTerapia)
                    
                 setData(florw)
                 
                })
            });
    }, []);


    const datos = {
        teras:
            idTerapias
        ,
        id: idTerapeuta
    }

    const enviars = (e) => {
        e.preventDefault()

        const url = 'http://yankisggm-001-site1.ctempurl.com/api/Clinica/Post'
        axios.post(url, datos).then((result) => {

            if (result) {
                swal({

                    title: "Correcto",
                    text: "Cambio guardado ",
                    icon: "success",

                });
            }
        })
    }

    function handleTerapeuta(e) {
        setIdTerapeuta(e.idUser)
    }

    function handle(selectedItems) {
        const ids = [];

        selectedItems.map(item => {

            ids.push(item.idTherapy)
        })
        setIdTerapias(ids)
    }

    return (
        <div >
            <Headers />
            <div className='cont-asignar'>

                <div className='form-asignar'>
                    <div className='cont-titu-asignacionTerapeuta'>
                        <h1>Asignación Terapeuta</h1>
                    </div>
                    <div className='sub-asignar'>

                        <div className='row' id='row-1-asignar' >
                            <div className='col'>
                                { /*
                                <select required className='asignarBarra' onChange={e => setNombreTerapeuta(e.target.value)} >
                                    <option selected>Select</option>
                                    {
                                        terapeuta.map(item => [
                                            <option value={item.idUser}>{item.names}</option>

                                        ])
                                    }
                                </select>
                                
                                */}
                                <Select
                                    options={terapeuta}
                                    onChange={handleTerapeuta}
                                />
                            </div>
                        </div>
                        <div className='row' id='id-react-select' >
                            <div className='col'>
                                {/*
                                <select required className='asignarBarra' onChange={e => handle(e.target.value)} >
                                    <option selected>Select</option>
                                    {
                                        data.map(item => [
                                            <option value={item.nombreTerapia.idTherapy}>{item.nombreTerapia.label}</option>
                                        ])
                                    }
                                </select>
  */}

                                <Select
                                    isMulti
                                    options={data}
                                    onChange={handle}

                                />
                            </div>
                        </div>
                        <button className='btn-buscar-citas' onClick={enviars}>Buscar</button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default TerapiaTerapeuta