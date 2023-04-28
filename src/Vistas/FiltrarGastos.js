

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

function FiltrarGastos() {

    const [citas, setCitas] = useState([]);
    const [tera, setTera] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [mensaje, setMensaje] = useState(null);
    const [mostrarVacio, setMostrarVacio] = useState(true);

    /*
    const datas = {
        DateOfInvestment: startDate,
        EndDate: endDate

        where Attendance.FechaInicio = @fechainicio and Attendance.FechaFinal = @FechaFinal
    }
    */
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

        const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/traerpaciente/GastosGanancia'
        axios.post(url, datas).then((result) => {
            console.log(result.data)
            setTera(result.data)
        })

        const urls = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/FiltrarGastos'
        axios.post(urls, data).then((result) => {

            if (result.data.mensaje) {
                setMensaje(result.data.mensaje)
            } else {
                setMostrarVacio(false)
                setCitas(result.data)
            }
        })
    }

    /*
   
      const enviars = (e) => {
          e.preventDefault()
  
          const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/FiltrarGastos'
          axios.post(url, datas).then((result) => {
              console.log(result.data)
  
              if (result.data.mensaje) {
                  setMensaje(result.data.mensaje)
              } else {
                  setMostrarVacio(false)
                  setCitas(result.data)
              }
          })
      }
      */
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
                                        <th>Descripcion</th>
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


                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default FiltrarGastos



