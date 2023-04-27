

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


    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);



    const datas = {
        DateOfInvestment: startDate,
        EndDate: endDate
    }


    const enviars = (e) => {

        e.preventDefault()


        const url = 'https://localhost:63958/api/Clinica/FiltrarGastos'
        axios.post(url, datas).then((result) => {

            console.log(result.data)
            if (result.data != null) {
                setCitas(result.data)
            }
        })
    }



    return (

        <div>
            <Headers />
            <div className='contPadreContabilidad'>
                <div className='cont-table-contabilidad'>
                    <div className='RangePicker'>
                        <div className='col'>
                            <input type='date' onChange={e => setStartDate(e.target.value)} />
                            <input type='date' onChange={e => setEndDate(e.target.value)} />
                        </div>
                    </div>
                    <div className='subBoxContabilidad'>
                        <table class="table" id='tabelContabilidad'>
                            <thead className='head'>
                                <tr>
                                    <th className="col">Descripcion</th>
                                    <th className="col">Monto</th>
                                    <th className="col">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    citas.map(item => [
                                        <tr>
                                            <td data-label="Pacientes">{item.descripcion}</td>
                                            <td data-label="Terapias">{item.amount}</td>
                                            <td data-label="Precio">{item.dateOfInvestment}</td>
                                        </tr>
                                    ])
                                }
                            </tbody>
                        </table>
                        <button className='btn-buscar-citas' onClick={enviars}>Buscar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FiltrarGastos



