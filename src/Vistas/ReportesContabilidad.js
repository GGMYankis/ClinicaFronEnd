

import Headers from '../Headers'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import $ from 'jquery';
import swal from 'sweetalert';
import { FaUser, FaUsers } from 'react-icons/fa';


function ReportesContabilidad() {

    const [descripcion, setDescipcion] = useState('')
    const [monto, setMonto] = useState('')
    const [fecha, setFecha] = useState('')


    function refreshPage() {
        window.location.reload();
    }


    const dataCrear = {
        Descripcion:descripcion,
        Amount:monto,
        DateOfInvestment:fecha
    };


    function enviarReporte(e) {

        e.preventDefault()

        const url = 'https://localhost:63958/api/Clinica/ContabilidadReportes';
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
                <form className='form-terapias' onSubmit={enviarReporte} id="formterapia">
                    <div className='cont-titu-Pagina-terapia'>
                        <h1>Reporte</h1>
                    </div>

                    <div className='sub-box-Terapia'>
                        <div className='cont-sub-terapia'>

                            <div className='cont-barra-tera'>
                                <label>Descripcion</label>
                                <input placeholder='Nombre de la terapia' onChange={(e) => setDescipcion(e.target.value)} required />
                            </div>
                            <div className='cont-barra-tera'>
                                <label>Monto</label>
                                <input placeholder='Descripcion' onChange={(e) => setMonto(e.target.value)}  required/>
                            </div>
                            <div className='cont-barra-tera'>
                                <label>Fecha</label>
                                <input type="date" placeholder='Precio' onChange={(e) => setFecha(e.target.value)} required />
                            </div>
                            <button className='btn-terapia' type='submit'>Guardar</button>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default ReportesContabilidad
