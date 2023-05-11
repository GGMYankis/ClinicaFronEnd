

import Headers from '../Headers'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import $ from 'jquery';
import swal from 'sweetalert';
import { FaUser, FaUsers } from 'react-icons/fa';


function Gastos() {

    const [descripcion, setDescipcion] = useState('')
    const [nombre, setNombre] = useState('')
    const [monto, setMonto] = useState('')
    const [fecha, setFecha] = useState('')


    function refreshPage() {
        window.location.reload();
    }


    const dataCrear = {
        Nombre: nombre,
        Descripcion: descripcion,
        Amount: parseFloat(monto),
        DateOfInvestment: fecha
    };


    function enviarReporte(e) {

        e.preventDefault()

        const url = 'http://yankisggm-001-site1.ctempurl.com/api/Clinica/ContabilidadReportes';
        axios.post(url, dataCrear).then((result) => {
            const probar = async () => {
                const ale = await swal({
                    title: "Correcto",
                    text: "Cambio guardado ",
                    icon: "success",
                });
                refreshPage()
            }
            if (result) {
                probar()
            }
        })
    }


    return (

        <div>
            <Headers />
            <div className='cont-form-terapia' >
                <form className='formReportesGastos' onSubmit={enviarReporte} id="formterapia">
                    <div className='cont-titu-Pagina-terapia'>
                        <h1>Gastos</h1>
                    </div>

                    <div className='sub-box-Terapia'>
                        <div className='cont-sub-terapia'>
                            <div className='cont-barra-tera'>
                                <label>Nombre</label>
                                <input onChange={(e) => setNombre(e.target.value)} required />
                            </div>

                            <div className='cont-barra-tera'>
                                <label>Monto</label>
                                <input onChange={(e) => setMonto(e.target.value)} required />
                            </div>
                            <div className='cont-barra-tera'>
                                <label>Fecha</label>
                                <input type="date" onChange={(e) => setFecha(e.target.value)} required />
                            </div>

                            <div className='cont-barra-tera'>
                                <label>Descripcion</label>
                                <textarea className='txtdescripciongastos' onChange={(e) => setDescipcion(e.target.value)} required></textarea>
                            </div>
                            <button className='btn-terapia' type='submit'>Guardar</button>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Gastos
