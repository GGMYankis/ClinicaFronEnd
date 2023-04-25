
import { error } from 'jquery'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Headers from '../Headers'
import swal from 'sweetalert';
import '../responsive.css'
import { deleteToken, getToken, initAxiosInterceptors, setUsuarioM, setUsuario, getDatosUsuario ,getUsuarioCompleto} from '../auth-helpers'

function Asistencias() {

    const [paciente, setPaciente] = useState()
    const [terapia, setTerapia] = useState()
    const [fecha, setFecha] = useState()
    const [idTerapeuta, setIdTerapeuta] = useState()
    const [observaciones, setObservaciones] = useState('')
    const [terapeuta, setTerapeuta] = useState([])
    const [data, setData] = useState([]);
    const [dataPaciente, setDataPaciente] = useState([]);


    const Fobser = (e) => {
        setFecha(e)
    }

    let id = getDatosUsuario()

    const date = {
        Idterapeuta:id
    }
    let rol = getUsuarioCompleto()
    useEffect(() => {


        axios.get('https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/Lista')
            .then(responses => {
                setDataPaciente(responses.data.lista)
            });

            if (rol == 2) {
                axios.post('https://localhost:63958/api/Clinica/GetEvaluacionByTerapeuta', date)
                    .then(response => {
    
                        setData(response.data)
                        console.log(response.data)
                    });
            } else {
                axios.get('https://localhost:63958/api/Clinica/ListaTerapia')
                    .then(response => {
                        console.log(response.data)
                        setData(response.data)
                    });
            }
        axios.get('https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/terapeuta')
            .then(response => {

                setTerapeuta(response.data.usuarios)
            });

    }, []);


    const dataValor =
    {
        idPatients: paciente,
        idTherapy: terapia,
        IdTerapeuta: idTerapeuta,
        FechaInicio: fecha,
        remarks: observaciones
    }



    const formAsistensscia = document.getElementById("formAsistencia");

    const enviar = (e) => {
        e.preventDefault()

        console.log(dataValor)
        const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/Asistencias';
        axios.post(url, dataValor).then((result) => {
            swal({
                title: "Correcto",
                text: "Cambio guardado ",
                icon: "success",
                button: "Aceptar"
            });

            if (result) {
                formAsistensscia.reset()
            }

        }).catch((error) => {

            console.log(error)

        })
    }


    return (

        <div>
            <Headers />
            
            <div className='cont-padre-asistencia' >
                <div className='contanedor-asistencias'>
                    <div className='cont-titu-asistencias'>
                        <h1>Asistencias</h1>
                    </div>

                    <form onSubmit={enviar} className="form-asistencia" id='formAsistencia'>

                        <label className='label-asistencia'>Lista de Pacientes</label>
                        <div className='row'>
                            <select onChange={e => setPaciente(e.target.value)} required className='select-asistencia' >
                                <option >Seleccione una Paciente</option>
                                {
                                    dataPaciente.map(item => [
                                        //<option key={item.value} value={item.value}>{item.value}</option>
                                        <option value={item.idPatients}>{item.name}</option>
                                    ])
                                }
                            </select>
                        </div>
                        <div className='row'>
                            <label className='label-asistencia'>Lista de Terapias</label>
                            <select onChange={e => setTerapia(e.target.value)} required className='select-asistencia' >
                                <option >Seleccione una Terapia</option>
                                {
                                    data.map(item => [
                                        //<option key={item.value} value={item.value}>{item.value}</option>
                                        <option value={item.nombreTerapia.idTherapy}>{item.nombreTerapia.label}</option>
                                    ])
                                }

                            </select>
                        </div>

                        <div className='row'>
                            <label className='label-asistencia'>Lista de Terapeuta</label>
                            <select onChange={e => setIdTerapeuta(e.target.value)} required className='select-asistencia' >
                                <option >Seleccione un Terapeuta</option>
                                {
                                    terapeuta.map(item => [
                                        //<option key={item.value} value={item.value}>{item.value}</option>
                                        <option value={item.idUser}>{item.names}</option>
                                    ])
                                }

                            </select>
                        </div>
                        <div className='row'>

                            <label className='label-asistencia'>Fecha</label>
                            <input type="datetime-local" required onChange={e => Fobser(e.target.value)} className='select-asistencia' />
                        </div>
                        <div className='row'>
                            <label className='label-asistencia'>Observaciones</label>
                            <textarea required onChange={e => setObservaciones(e.target.value)} className='select-asistencia' />
                        </div>
                        <div className='row'>
                            <button type='submit' className='btn-asistencia' >Guardar</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Asistencias


