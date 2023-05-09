
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
import { deleteToken, getToken, initAxiosInterceptors, setUsuarioM, setUsuario, getDatosUsuario, getUsuarioCompleto } from '../auth-helpers'




function Evaluacion() {
    const [data, setData] = useState([]);
    const [dataPaciente, setDataPaciente] = useState([]);
    const [listapacientes, setListaPasientes] = useState([]);
    const [listaTerapia, setListaTerapia] = useState([]);
    const cookies = new Cookies();
    const navigation = useNavigate();
    const [idPatients, setIdPatients] = useState()
    const [idTherapy, setIdTherapy] = useState()
    const [priceEvaluacion, setPriceEvaluacion] = useState()
    const [day, setDay] = useState('')
    const [frecuencia, setFrecuencia] = useState('')
    const [repetir, setRepetir] = useState(null)
    const [fechaInicio, setFechaInicio] = useState(null)
    const [nom, setNom] = useState("")
    const [terapeuta, setTerapeuta] = useState([])
    const [idterapeuta, setIdterapeuta] = useState(0)

    let id = getDatosUsuario()
    let rol = getUsuarioCompleto()

    const date = {
        Idterapeuta: id
    }


    useEffect(() => {
        axios.get('https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/Lista')
            .then(responses => {

                setDataPaciente(responses.data.lista)
            });

        if (rol == 2) {
            axios.post('https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/GetEvaluacionByTerapeuta', date)
                .then(response => {

                    setData(response.data)
                });
        } else {
            axios.get('https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/ListaTerapia')
                .then(response => {
                    setData(response.data)
                });
        }



        axios.get('https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/terapeuta')

            .then(response => {

                setTerapeuta(response.data.usuarios)
            })

    }, []);




    const pasientes = (e) => {
        setIdPatients(e)
    }



    const Fterapeuta = (e) => {
        setIdterapeuta(e)
    }





    const terapias = (e) => {

        console.log(e)
        if (e != null) {
            $('#FormModal').show();
            setIdTherapy(e)

        }
    }


    const precioModal = (e) => {

        setPriceEvaluacion(e)
    }



    const dataEvaluacion = {

        IdPatients: idPatients,
        IdTherapy: idTherapy,
        Price: priceEvaluacion,
        FechaInicio: fechaInicio,
        Repetir: repetir,
        Frecuencia: frecuencia,
        Dias: day,
        IdTerapeuta: idterapeuta,
        Hola: nom
    };




    const EnviarEvaluacion = (e) => {
        e.preventDefault()

        if (idPatients == null) {
            return;
        }


        const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/traerpaciente/CrearEvaluacion';
        axios.post(url, dataEvaluacion).then((resultEvaluacion) => {
            console.log(resultEvaluacion)

            swal({
                title: "Correcto",
                text: "Se ha guardado correctamente",
                icon: "success",
                button: "Aceptar",

            });
        })

    }



    function cancelarModal() {
        $('#FormModal').hide();
    };

    function modal() {
        $('#FormModal').hide();
    };

    function dia(e) {
        setDay(e)
        console.log(day)
    };


    function Ffrecuencia(e) {
        setFrecuencia(e)
        console.log(frecuencia)
    };


    function FRepetir(e) {
        setRepetir(e)
        console.log(repetir)
    };
    function FFechaInicio(e) {
        setFechaInicio(e)
        console.log(fechaInicio)
    };


    function Fviistas(e) {
        setNom(e)
    };
    return (


        <div>

            <div id="FormModal" className='modal' data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel">



                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header bg-dark text-white">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Usuario</h1>
                        </div>

                        <div className="modal-body ">


                            <div className="row  g-2">
                                <div className="">

                                    <input type="checkbox" value="visitas" onChange={e => Fviistas(e.target.value)} />Visitas<br></br>

                                    <label htmlFor="txtnombres" className="form-label">Precio de la Terapia</label>
                                    <input type="text" className="form-control" id="txtnombres" onChange={(e) => precioModal(e.target.value)} autoComplete="off" />
                                </div>


                            </div>

                            <div className='cont-btn-evaluacion'>
                                <button className='btn-Guardar' onClick={modal}>Guardar</button>
                                <button className='btn-Cancelar' onClick={cancelarModal}>Cancelar</button>
                            </div>


                        </div>

                    </div>
                </div>
            </div>


            <Headers />

            <div className='contenedor-evaluacion'>
                <form className='form-select-evaluacion' onSubmit={EnviarEvaluacion}>

                    <div className='cont-titu-select'>
                        <h1>Citas</h1>
                        <i className="bi bi-person-circle"></i>
                    </div>

                    <div className='sub-cont-evaluacion'>


                        <div className='cont-select-evaluacion1'>
                            <p className='titu-barra'>   Lista de Pacientes </p>
                            <select className='form-select' required onChange={e => pasientes(e.target.value)}  >
                                <option >Seleccione una paciente</option>
                                {
                                    dataPaciente.map(item => [
                                        <option key={item.IdPatients} value={item.idPatients}>{item.name}</option>

                                    ])

                                }

                            </select>
                        </div>


                        <div className='cont-select-evaluacion1'>
                            <p className='titu-barra'> Lista de Terapias </p>

                            <select className='form-select' onChange={e => terapias(e.target.value)} required >
                                <option >Seleccione una terapia</option>

                                {
                                    data.map(item => [
                                        <option >{item.nombreTerapia.label}</option>
                                    ])
                                }

                            </select>
                        </div>


                        <div className='cont-select-evaluacion1'>
                            <p className='titu-barra'> Terapeuta </p>
                            <select className='form-select' onChange={e => Fterapeuta(e.target.value)} required >
                                <option >Seleccione un Terapeuta</option>
                                {
                                    terapeuta.map(item => [
                                        <option value={item.idUser}>{item.names}</option>

                                    ])
                                }
                            </select>
                        </div>

                        <hr></hr>
                        <div>

                            <div className='cont-recurrence'>
                                <p className='tite-recu'>Recurrencia</p>
                            </div>
                            <div className='cont-recurrence' id='recu-fecha'>
                                <p className='text-recu'>Fecha de Inicio</p>
                                <input type="date" className='recu-fecha-inicio' min="2023-03-24" onChange={e => FFechaInicio(e.target.value)} required />
                            </div>

                            <div className='cont-recurrence'>
                                <p className='text-recu'>Repetir</p>
                                <input type="number" className='recu-repe' onChange={e => FRepetir(e.target.value)} required min="1" />
                                <select className='recu-select' onChange={(e) => Ffrecuencia(e.target.value)} required>
                                    <option>Diario</option>
                                    <option>Semanal</option>
                                    <option>Mensual</option>
                                </select>
                            </div>

                            <div className='cont-recurrence check-select'>
                                <input type="checkbox" id='diasCheckD' className='check' value="domingo" onChange={(e) => dia(e.target.value)} />
                                <label htmlFor="diasCheckD" id='labeldiasCheckD' className='labelCheck'  >
                                    D
                                </label>
                                <input type="checkbox" id='diasCheckL' value="lunes" className='check' onChange={(e) => dia(e.target.value)} />
                                <label htmlFor="diasCheckL" id='labeldiasCheckL' className='labelCheck' >
                                    L
                                </label>
                                <input type="checkbox" id='diasCheckM' value="martes" className='check' onChange={(e) => dia(e.target.value)} />
                                <label htmlFor="diasCheckM" id='labeldiasCheckM' className='labelCheck'  >
                                    M
                                </label>
                                <input type="checkbox" id='diasCheckMM' value="miercoles" className='check' onChange={(e) => dia(e.target.value)} />
                                <label htmlFor="diasCheckMM" id='labeldiasCheckMM' className='labelCheck'  >
                                    M
                                </label>
                                <input type="checkbox" id='diasCheckJ' value="jueves" className='check' onChange={(e) => dia(e.target.value)} />
                                <label htmlFor="diasCheckJ" id='labediasCheckJ' className='labelCheck'  >
                                    J
                                </label>
                                <input type="checkbox" id='diasCheckV' value="viernes" className='check' onChange={(e) => dia(e.target.value)} />
                                <label htmlFor="diasCheckV" id='labeldiasCheckV' className='labelCheck' >
                                    V
                                </label>
                                <input type="checkbox" id='diasCheckS' value="sabado" className='check' onChange={(e) => dia(e.target.value)} />
                                <label htmlFor="diasCheckS" id='labeldiasCheckS' className='labelCheck' >
                                    S
                                </label>
                            </div>

                        </div>
                        <button className='btn-evaluacion'>Guadar</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Evaluacion