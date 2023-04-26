
import Cookies from 'universal-cookie';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import logo from "../imagenes/IMG-20230221-WA0009.png"
import { FaBars } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { FaCaretDown } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Link, Redirect } from 'react-router-dom'
import $ from 'jquery';
import { findDOMNode } from 'react-dom'
import swal from 'sweetalert';
import { deleteToken, getToken, initAxiosInterceptors, setUsuarioM, obtenerUser, getNombreUsuario } from '../auth-helpers'
import '../Tabla.css';
import { useCookies } from 'react-cookie';

function ListasTerapias() {
    obtenerUser()
    const [terapias, setTerapias] = useState([])
    const [nmTerapias, setNmTerapias] = useState('  ')
    const [descripcion, setDescripcion] = useState('  ')
    const [price, setPrice] = useState(0)
    const [porcentaje, setPorcentaje] = useState()
    const [idTerapiaEliminar, setIdTerapiaEliminar] = useState()
    const [id, setId] = useState()
    const navigation = useNavigate();

    const modal = useRef()
    const modalEditar = useRef()

    useEffect(() => {

        axios.get('https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/ListaTerapia')

            .then(response => {
                setTerapias(response.data.lista)
            })


    }, [])


    const data2 = {

        Label: nmTerapias,
        Description: descripcion,
        Price: price,
        Porcentaje: porcentaje

    }

    const FormularioTherapy = document.getElementById("FormularioTherapy");
    const enviarDatosCrear = (e) => {

        e.preventDefault()
        const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/CrearTerapia';
        axios.post(url, data2).then(res => {

            const probar = async () => {

                const ale = await swal({
                    title: "Correcto",
                    text: "Cambio guardado ",
                    icon: "success",
                });

                refreshPage()
            }

            if (res) {
                probar()
            }

            FormularioTherapy.reset()
        })

    }

    const Fcterapia = (e) => {
        setNmTerapias(e)
    }

    const Fcdescripcion = (e) => {
        setDescripcion(e)
    }



    const logout = () => {

        deleteToken()
        navigation("/login")
    }

    const dataEdi = {

        IdTherapy: id,
        Label: nmTerapias,
        Description: descripcion,
        Price: price,
        Porcentaje: porcentaje
    }

    const enviarDatos = (e) => {
        e.preventDefault()
        const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/EditarTerapia';
        axios.post(url, dataEdi).then(res => {

            $('#form-perfil').hide();

            const probar = async () => {

                const ale = await swal({

                    title: "Correcto",
                    text: "Cambio guardado ",
                    icon: "success",

                });

                refreshPage()
            }

            if (res) {
                probar()
            }
        })
    }

    function editar(e) {

        modalEditar.current.classList.add('activoEditar')

        setId(e)
        const res = terapias.filter(item => item.idTherapy == e)
        res.map(item => [
            setNmTerapias(item.label),
            setDescripcion(item.description),
            setPrice(item.price),
            setPorcentaje(item.porcentaje),
        ])

    };

    function refreshPage() {

        window.location.reload();
    }

    function eliminar() {

        const idPa = { IdTherapy: idTerapiaEliminar }
        const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/EliminarTerapia';
        axios.post(url, idPa).then(res => {

            $('#eliminarPaciente').hide();
            const probar = async () => {

                const ale = await swal({
                    title: "Correcto",
                    text: "Cambio guardado ",
                    icon: "success",
                });

                refreshPage()
            }

            if (res) {
                probar()
            }

        })

    };

    const modalCerrarEliminar = () => {
        $('#eliminarPaciente').hide();
    }

    function quitarModal() {
        modalEditar.current.classList.remove('activoEditar')
        $('#form-perfil-registrar').hide();
    };

    const modalEliminar = (e) => {
        $('#eliminarPaciente').show();
        setIdTerapiaEliminar(e)
    }
    const myElement = useRef(null);

    const handleClick = () => {
        myElement.current.classList.toggle('mi-clase-css');
    };

    function modalF() {
        modal.current.classList.add('activo')
    }

    function modalQuitarF() {
        modal.current.classList.remove('activo')
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
                                <Link className='letras-menu' to="/TerapiaTerapeuta">Asignación</Link>
                            </li>
                            <li>
                                <Link className='letras-menu' to="/Users">Usuario</Link>
                            </li>
                            <li>
                                <Link className='letras-menu' to="/reportesContabilidad">Reportes</Link>
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

                <div className='contenedor-botones'>
                    <div className='cont-btn-headers'>
                        <div className='probarUs'>
                            <Link className='Link' to="/perfilAdmin">{obtenerUser()}</Link>
                        </div>
                    </div>
                    <div className='cont-nombre-usuario'>
                        <p className='nombreUsuario'>{getNombreUsuario()}</p>
                    </div>
                </div>


            </header>


            <div className='table-container' ref={myElement} id='ggs'>

                <div className='sex-tables'>
                    <div className='cont-titu-terapia'>
                        <h1>Listado de Terapias</h1>
                    </div>
                    <div className='cont-crear-paciente'  >
                        <button className="btn-crear-Paciente-tabla" onClick={modalF}>Crear Terapia</button>
                    </div>

                    <div className='sub-2'>
                        <table className='table' id="table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripcion</th>
                                    <th>Precio</th>
                                    <th>Porcentaje</th>
                                    <th>

                                    </th>
                                </tr>
                            </thead>


                            <tbody>
                                {
                                    terapias.map(item => [
                                        <tr>
                                            <td data-label="Nombre" key={item.label} >{item.label}</td>
                                            <td data-label="Descripcion" key={item.description}>{item.description}</td>
                                            <td data-label="Price" key={item.price}>{item.price}</td>
                                            <td data-label="Price" key={item.porcentaje}>{item.porcentaje}</td>
                                            <td>
                                                <button className='btn ' type='button' value={item.idTherapy} onClick={e => editar(e.target.value)} >Editar</button>
                                                <button className='btn eliminar' type='button' value={item.idTherapy} onClick={e => modalEliminar(e.target.value)}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ])
                                }

                            </tbody>

                        </table>
                    </div>
                </div>



            </div>




            <div className='cont-modal-lista-terapia' ref={modal}>

                <form className='form-perfil-terapi' onSubmit={enviarDatosCrear} id="FormularioTherapy"   >
                    <div className='cont-titu-terapia'>
                        <h1>Crear Terapia</h1>

                    </div>
                    <div className='box-con'>
                        <div className='con-input-terapia'>
                            <label>Terapia</label>
                            <input placeholder='Terapia' required onChange={e => Fcterapia(e.target.value)} />
                        </div>
                        <div className='con-input-terapia'>
                            <label>Descripción</label>
                            <input placeholder='Descripción' required onChange={e => Fcdescripcion(e.target.value)} />
                        </div>
                        <div className='con-input-terapia'>
                            <label>Precio</label>
                            <input placeholder='Precio' id="precio" required onChange={e => setPrice(e.target.value)} />
                        </div>
                        <div className='con-input-terapia'>
                            <label>Porcentaje</label>
                            <input placeholder='Precio' id="precio" required onChange={e => setPorcentaje(e.target.value)} />
                        </div>
                        <button className='btn-editar-terapia' >Crear</button>
                        <button className='btn-eliminar-terapia' type='button' onClick={modalQuitarF}>Cancelar</button>
                    </div>
                </form>
            </div>

            {/*  EDITAR TERAPIA   onClick={Fcprice} */}

            <div className='cont-modal-lista-terapiaEditar' ref={modalEditar} >

                <form className='form-perfil-terapi' id="FormularioEditarTherapy" >
                    <div className='cont-titu-terapia'>
                        <h1>Editar Terapia</h1>
                    </div>

                    <div className='box-con'>

                        <div className='con-input-terapia'>
                            <label>Terapia</label>
                            <input placeholder='Terapia' value={nmTerapias} onChange={e => setNmTerapias(e.target.value)} />
                        </div>

                        <div className='con-input-terapia'>
                            <label>Descripción</label>
                            <input placeholder='Descripción' value={descripcion} onChange={e => setDescripcion(e.target.value)} />

                        </div>


                        <div className='con-input-terapia'>
                            <label>Precio</label>
                            <input placeholder='Precio' value={price} onChange={e => setPrice(e.target.value)} />
                        </div>
                        <div className='con-input-terapia'>
                            <label>Porcentaje</label>
                            <input placeholder='Precio' id="precio" value={porcentaje} required onChange={e => setPorcentaje(e.target.value)} />
                        </div>
                        <button className='btn-editar-terapia' onClick={enviarDatos}>Editar</button>
                        <button className='btn-eliminar-terapia' onClick={quitarModal}>Cancelar</button>
                    </div>
                </form>

            </div>



            <div className="modal" tabIndex="-1" id='eliminarPaciente' >

                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Eliminar Terapia</h5>

                        </div>
                        <div className="modal-body">
                            {

                                <p>¿Deseas eliminar esta  Terapia?</p>

                            }
                        </div>
                        <div className="modal-footer">

                            <button type="button" className="btn btn-primary" onClick={modalCerrarEliminar}>No</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={eliminar}>Si</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListasTerapias
