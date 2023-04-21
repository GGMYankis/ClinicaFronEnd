
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


function Abono() {

    const [data, setData] = useState([]);
    const [dataPaciente, setDataPaciente] = useState([]);


    useEffect(() => {


        axios.get('https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/Lista')
            .then(responses => {
                setDataPaciente(responses.data.lista)
            });

        axios.get('https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/ListaTerapia')
            .then(response => {
                setData(response.data.lista)
            });
    }, []);


    const pasientes = (e) => {
        console.log(e)
    }


    const terapias = (e) => {
        console.log(e)

    }

    const Fdecripcion = (e) => {

        console.log(e)
    }


    const Ffecha = (e) => {
        console.log(e)
    }



    const dataEvaluacion = {

    };



    const EnviarAbono = (e) => {
        e.preventDefault()

        const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/traerpaciente/Abono';
        axios.post(url, dataEvaluacion).then((resultEvaluacion) => {


            if (resultEvaluacion) {
                swal({
                    title: "Correcto",
                    text: "Se ha guardado correctamente",
                    icon: "success",
                    button: "Aceptar",

                });
            }

        })

    }



    return (

        <div>
            <Headers />


            <div className='cont-abono'>
                <form className='form-abono'>
                    <div className='cont-titu-abono'>
                        <h1>Abono</h1>
                    </div>
                    <div className='sub-boxAbono'>



                        <div className='row' id='cont-barra-bono'>
                            <select className='form-select' required onChange={e => pasientes(e.target.value)} >
                                <option >Seleccione una paciente</option>
                                {
                                    dataPaciente.map(item => [
                                        //<option key={item.value} value={item.value}>{item.value}</option>
                                        <option key={item.IdPatients} value={item.idPatients}>{item.name}</option>

                                    ])

                                }
                            </select>
                        </div>

                        <div className='row' id='cont-barra-bono'>
                            <select className='form-select' onChange={e => terapias(e.target.value)} required >
                                <option >Seleccione una terapia</option>
                                {
                                    data.map(item => [
                                        //<option key={item.value} value={item.value}>{item.value}</option>
                                        <option value={item.idTherapy}>{item.label}</option>
                                    ])
                                }
                            </select>
                        </div>



                        <div className='row' id='cont-barra-bono'>
                            <input type='date' className='form-select' onChange={e => Ffecha(e.target.value)} required />
                        </div>
                        <div className='row' id='cont-barra-bono'>
                            <input type='text' className='form-select' onChange={e => Fdecripcion(e.target.value)} required />
                        </div>
                        <button className='btnAbono' onClick={EnviarAbono}>Guardar</button>
                    </div>
                </form>

            </div>


        </div>
    )
}

export default Abono




