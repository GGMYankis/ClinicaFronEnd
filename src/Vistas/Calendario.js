import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import Headers from '../Headers'
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import $ from 'jquery';
import logo from "../imagenes/IMG-20230221-WA0009.png"
import { FaBars } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import { deleteToken, getToken, initAxiosInterceptors, setUsuarioM, obtenerUser } from '../auth-helpers'



function Calendario() {


    const [event, setEvent] = useState([])
    const [valor, setValor] = useState()
    const cookies = new Cookies();
    const navigation = useNavigate();
    const [fechaInicio, setfechaInicio] = useState('')
    const [horaInicio, setHoraInicio] = useState('')
    const [descripcion, setDescripcion] = useState('')
    obtenerUser()



    const FfechaInicio = (e) => {
        setfechaInicio(e)
    }


    const FHoraInicio = (e) => {
        setHoraInicio(e)
    }

    const FDescripcion = (e) => {
        setDescripcion(e)
    }

    useEffect(() => {

        axios.get('https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/calendario')
            .then(res => {
                console.log(res.data.lista)

                setEvent(res.data.lista.map(item => ({
                    id: item.idAsistencias,
                    title: item.remarks,
                    start: new Date(item.fechaInicio),
                })))

            });

    }, []);




    const data =
    {
        FechaInicio: fechaInicio + 'T' + horaInicio,
        Remarks: descripcion
    }



    function refreshPage() {
        window.location.reload();
    }



    const enviar = (e) => {

        e.preventDefault()

        console.log(data)

        const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/AgregarEvento'
        axios.post(url, data).then((result) => {
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

            $('#eliminarPaciente').hide();

            //  refreshPage()
        })


    }


    const logout = () => {

        cookies.remove("MyCookies")
        cookies.remove("Perfil")
        cookies.remove("Usuario")
        navigation("/login")

    }

    const modalCerrarEliminar = () => {

        $('#eliminarPaciente').hide();
    }
    const modalCerrarEliminarFecha = () => {

        $('#eliminarEvento').hide();
    }




    const myElement = useRef(null);

    const handleClick = () => {
        myElement.current.classList.toggle('calendario');
    };



    function handleEventClick(info) {

        $('#eliminarPaciente').show();
        if (info.allDay) {

            $('#FechaInicio').val(info.dateStr);
            setfechaInicio(info.dateStr)


        }

    }


    function limpiarFormulario() {

        $('#Descripcion').val('');
    }




    const [id, setId] = useState()

    async function handleEventClickFecha(info) {

        $('#eliminarEvento').show();
        const IdAsistencias = await info.event.id
        setId(IdAsistencias)

    }





    const datas = {

        IdAsistencias: id
    }

    function eliminarFecha() {

        console.log(datas)

        const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/Fecha';
        axios.post(url, datas)
            .then(response => {



                $('#eliminarEvento').hide();
                const probar = async () => {

                    const ale = await swal({

                        title: "Correcto",
                        text: "Cambio guardado ",
                        icon: "success",

                    });

                    refreshPage()
                }

                if (response) {
                    probar()
                }


            })
            .catch(error => {
                console.error(error);
            });
    }



    async function handleEventDrop({ event }) {


        const fechad = await event.start
        await setfechaInicio(fechad)

        enviarOtra()

    }



    const datass =
    {
        Age: fechaInicio,
        Description: 'nose'
    }


    const enviarOtra = () => {

        console.log(datass)
        const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/traerpaciente/AgregarEvento'
        axios.post(url, datass).then((result) => {

        })
    }



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
                                <a className='Cerra-Sesion-ul' onClick={logout}>Cerra Sesión</a>
                            </li>

                        </ul>
                    </nav>
                </div>

                <div className='cont-logo-header'>
                    <img className='img-admin-logo' src={logo} />
                    <span className='ver'><span className='gg'>é</span>nfasis</span>
                </div>

                <div className='cont-btn-headers'>
                    <div className='probarUs'>
                        <samp className='' to="/perfilAdmin">{obtenerUser()}</samp>
                    </div>


                </div>


            </header>

            <div className='cont-padre' ref={myElement}>
                <div id='calendario'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        editable={true}
                        droppable={true}
                        initialView={'dayGridMonth'}
                        events={event}
                        headerToolbar={{
                            start: "today prev,next",
                            center: "title",
                            end: "dayGridMonth,timeGridWeek,timeGridDay",
                        }}


                        eventDrop={handleEventDrop}



                        height={"80vh"}
                        eventDidMount={(info) => {
                            return new bootstrap.Popover(info.el, {
                                title: info.event.title,
                                placement: "auto",
                                trigger: "hover",
                                customClass: "popoverStyle",
                                content:
                                    " <p>Please subcribe</p>",
                                html: true

                            })
                        }}

                        dateClick={handleEventClick}
                        eventClick={handleEventClickFecha}
                    />
                </div>
            </div>


            <div className="modal" tabIndex="-1" id='eliminarPaciente' >

                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Agenda de eventos</h5>

                        </div>
                        <div className="modal-body">

                            <form onSubmit={enviar}>
                                <div className='row' id='fila-agenda' >
                                    <div className='col'>
                                        <label>Fecha de inicio</label>
                                        <div className='input-group' data-autoclose="true">
                                            <input type="date" id='FechaInicio' value={valor} className='form-control' onChange={e => FfechaInicio(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className='col'  >

                                        <label>Hora de inicio</label>
                                        <div className='input-group' data-autoclose="true">
                                            <input type="time" id='FechaInicio' className='form-control' onChange={e => FHoraInicio(e.target.value)} />
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className='col'>
                                        <textarea required className='form-control' onChange={e => FDescripcion(e.target.value)} rows="3" />
                                    </div>

                                </div>
                                <div className='modal-footer'>
                                    <button id='BotonAgregar' className='btn btn-primary' type='submit'>Guardar</button>
                                    <button id='BotonAgregar' className='btn btn-danger' type='button' onClick={modalCerrarEliminar}>Cancelar</button>
                                </div>

                            </form>

                        </div>




                    </div>
                </div>
            </div>

            <div className="modal" tabIndex="-1" id='eliminarEvento' >

                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Eliminar evento</h5>

                        </div>
                        <div className="modal-body">
                            {

                                <p>¿Deseas eliminar esta  evento?</p>

                            }
                        </div>
                        <div className="modal-footer">

                            <button type="button" className="btn btn-primary" onClick={modalCerrarEliminarFecha}>No</button>
                            <button type="Submit" className="btn btn-danger" data-dismiss="modal" onClick={eliminarFecha}>Si</button>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Calendario







//como obtener la fecha al darle clik en un full calendar y poder obtener esa fecha  y enviar a .net 6  para en el servidor eliminarla 



/*
[HttpDelete]
public IActionResult DeleteEvento(DateTime fecha)
{
    var evento = dbContext.Eventos.FirstOrDefault(e => e.Fecha == fecha);
    if (evento == null)
    {
        return NotFound();
    }

    dbContext.Eventos.Remove(evento);
    dbContext.SaveChanges();

    return Ok();
}


*/