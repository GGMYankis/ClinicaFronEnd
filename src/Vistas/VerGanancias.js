

import 'react-date-range/dist/styles.css'; // Importa los estilos CSS
import 'react-date-range/dist/theme/default.css'; // Importa los estilos del tema por defecto
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Headers from '../Headers';
import { useRef } from 'react';
import $ from 'jquery';

import { DatePicker } from 'antd';
import moment from 'moment'

const { RangePicker } = DatePicker;

function VerGanancias() {

    const [citas, setCitas] = useState([]);
    const [tera, setTera] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [mensaje, setMensaje] = useState(false);
    const [mostrarVacio, setMostrarVacio] = useState(true);


    const [sumarGastos, setSumarGastos] = useState(0);
    const [surmarAsistencia, setSurmarAsistencia] = useState(0);
    const [acolumaldo, setAcolumaldo] = useState(0);

    const negaClas = useRef(null);

    function suma(monto) {

        let acolumaldo = 0;
        for (let i = 0; i < monto.length; i++) {
            acolumaldo += monto[i]
        }
        setSumarGastos(acolumaldo)
    }



    function ganancias() {

        setAcolumaldo(sumarGastos - surmarAsistencia)

        if (acolumaldo == 0) {
        } else if (acolumaldo > 0) {
        } else {
            negaClas.current.classList.add('activoNega')
        }
    }

    const data = {
        DateOfInvestment: startDate,
        EndDate: endDate
    }
    const datas = {
        FechaInicio: startDate,
        FechaFinal: endDate
    }

    const enviars = (e) => {

        e.preventDefault()

        const urls = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/FiltrarGastos'
        axios.post(urls, data).then((result) => {

            if (result.data.mensaje) {
                setMensaje(true)
            } else {
                setMensaje(false)
                setMostrarVacio(false)
                setCitas(result.data)
                const monto = result.data.map(m => m.amount)
                const resultado = suma(monto)

            }
        })

        const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/traerpaciente/GastosGanancia'
        axios.post(url, datas).then((result) => {

            if(result.data.length){
            }else{
            }
            
            setTera(result.data)
            result.data.map(m => {
                setSurmarAsistencia(m.price)
                ganancias()
            })
        })
    }



    return (

        <div>
            <Headers />
            <div className='contenedor-FiltrarGastos'>

                <div className='contTableGastos'>
                    <div className='cont-titu-gastos'>
                        <h1>Historial de gastos</h1>
                    </div>

                    <div className='cont-box-body-gastos'>
                        <div className='row' id='cont-input-gastos'>
                            <div className='col'>
                                <label>Fecha Inicio</label>
                                <input type='date' className='inputgastos' onChange={e => setStartDate(e.target.value)} />
                            </div>
                            <div className='col'>
                                <label>Fecha Fin</label>
                                <input type='date' className='inputgastos' onChange={e => setEndDate(e.target.value)} />
                            </div>
                            <div className='col'>
                                <button className='btn-gastos' onClick={enviars}>Buscar</button>
                            </div>
                        </div>
                        <hr></hr>

                        <div className='cont-table-gastos'>
                            <div className='cont-titu-gastos-tabla'>
                                <p>Gastos</p>
                            </div>
                            <table className='table-gastos'>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Monto</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody className='body-table-gastos'>

                                    {
                                        citas.map(item => [
                                            <tr>
                                                <td data-label="Descripcion">{item.nombre}</td>
                                                <td data-label="Descripcion">{item.descripcion}</td>
                                                <td data-label="Monto">{item.amount}</td>
                                                <td data-label="Fecha">{item.dateOfInvestment.substring('', 10)}</td>
                                            </tr>
                                        ])
                                    }

                                    {mostrarVacio ?

                                        <p className='sinbusqueda-gastos'>Sin busqueda...</p> : ""
                                    }
                                </tbody>
                            </table>
                            <div className='cont-titu-ganancia-tabla'>
                                <p>Ganancia</p>
                            </div>
                            <table className='table-gastos'>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Monto</th>
                                        <th>Fecha</th>
                                    </tr>

                                </thead>
                                <tbody className='body-table-gastos'>

                                    {
                                        tera.map(item => [
                                            <tr>
                                                <td data-label="Descripcion">{item.label}</td>
                                                <td data-label="Descripcion">{item.price}</td>
                                                <td data-label="Descripcion">{item.fechaInicio.substring('', 10)}</td>

                                            </tr>
                                        ])
                                    }

                                    {mostrarVacio ?

                                        <p className='sinbusqueda-gastos'>Sin busqueda...</p> : ""
                                    }
                                </tbody>
                            </table>

                            <div className='cont-titu-ganancia-tabla'>
                                <p>Ganancia del Periodo</p>
                            </div>
                            <div>
                                {sumarGastos == false && surmarAsistencia == false ?
                                    <p className='sinbusqueda-gastos' >Sin busqueda...</p> : <h1 className='negaClas'  ref={negaClas}>{sumarGastos - surmarAsistencia}</h1>
                                }
                                { mensaje ?
                                    <div class="alert alert-danger" role="alert">
                                   No se encontraron registros
                                  </div>
                                    : ""
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default VerGanancias

