
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Headers from '../Headers'
import swal from 'sweetalert';
import { FaUser, FaUsers, FaTrash, FaEdit } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa'
import { BrowserRouter, Routes, Route, Link, Redirect } from 'react-router-dom'
import { DeleteToken, getToken, initAxiosInterceptors, setUsuarioM, obtenerUser, getNombreUsuario } from '../auth-helpers'
import { useNavigate } from 'react-router-dom';
import logo from "../imagenes/IMG-20230221-WA0009.png"

function Users() {
    const [terapeuta, setTerapeuta] = useState([])
    const [accion, setAccion] = useState(0)
    const [idUser, setIdUser] = useState(0)
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [telefono, setTelefono] = useState('')
    const [direccion, setDireccion] = useState('')
    const [correo, setCorreo] = useState('')
    const [contraseñas, setContraseñas] = useState('')
    const [idRol, setIdRol] = useState(0)

    const navigation = useNavigate();
    function refreshPage() {
        window.location.reload();
    }

    const modalEditar = useRef()
    const modalCrear = useRef()
    const modalEliminar = useRef()



    useEffect(() => {


        axios.get('https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/ListaUsers')

            .then(response => {



                response.data.lista.map(a => {

                    if (a.idRol == 1) {

                        setTerapeuta(a.idRol = 'Administrador')
                    }
                    else if (a.idRol == 2) {
                        setTerapeuta(a.idRol = 'Terapeuta')
                    }


                    setTerapeuta(response.data.lista)
                })


            })
    }, []);



    const data = {
        IdUser: idUser,
        Names: nombre,
        Label: nombre,
        Apellido: apellido,
        Telefono: telefono,
        Direccion: direccion,
        Email: correo,
        Password: contraseñas,
        IdRol: idRol
    };

    function enviar(e) {

        e.preventDefault()

        const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/GuardarUsers';
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

        })

    }

    const dataCrear = {
        IdUser: idUser,
        Names: nombre,
        Label: nombre,
        Apellido: apellido,
        Telefono: telefono,
        Direccion: direccion,
        Email: correo,
        Password: contraseñas,
        IdRol: idRol
    };



    function CrearUsuario(e) {

        e.preventDefault()

        const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/CrearUsuario';
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


    function EditarUsuario(valor) {

        modalEditar.current.classList.add('activeUsers')

        const encontrado = terapeuta.filter(e => e.idUser == valor)
        console.log(encontrado)
        encontrado.map(item => {
            setNombre(item.names)
            setApellido(item.apellido)
            setTelefono(item.telefono)
            setDireccion(item.direccion)
            setCorreo(item.email)
            setContraseñas(item.password)
            setIdRol(item.idRol)
        })
        setIdUser(valor)
    }





    function Cancelar() {
        modalCrear.current.classList.remove('activeCrear')
        modalEditar.current.classList.remove('activeUsers')
        modalEliminar.current.classList.remove('activeEli')
    }

    function modalF() {
        modalCrear.current.classList.add('activeCrear')
    }




    function EliminarUsuario(valor) {

        const encontrado = terapeuta.filter(e => e.idUser == valor)
        encontrado.map(n => {
            setNombre(n.names)
        })


        setIdUser(valor)
        modalEliminar.current.classList.add('activeEli')
    }


    const idusers = {
        IdUser: idUser
    }

    function enviarId() {

        const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/EliminarUsuario';
        axios.post(url, idusers).then((result) => {
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

    const logout = () => {
        DeleteToken()
        navigation("/login")
    }

    const myElement = useRef(null);


    const handleClickOtro = () => {
        myElement.current.classList.toggle('mi-clase-css');
    };
    return (

        <div>
            <header className='encabezado'>
                <div>
                    <nav>
                        <input type="checkbox" id="check" />
                        <input type="checkbox" id="checkOtro" onClick={handleClickOtro} />
                        <label htmlFor="check" className="checkbtn">
                            <FaBars id='bar' />
                        </label>
                        <label htmlFor="checkOtro" className="checkbtnOtro">
                            <FaBars id='bar' />
                        </label>

                        <ul>
                            <li>
                                <Link className='letras-menu' to="/admin">Paciente de ingreso</Link>
                            </li>
                            <li>
                                <Link className='letras-menu' to="/evaluacion">Citas</Link>
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
                                <Link className='letras-menu' to="/gastos">Reportes</Link>
                            </li>
                            <li>
                                <Link className='letras-menu' to="/VerGanancias">Ver Ganancias</Link>
                            </li>

                            <li>
                                <a className='letras-menu' onClick={logout}>Cerra Sesión</a>
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



            <div className='contCard' ref={myElement}>
                <div className="card">
                    <div className="card-header">
                        <FaUsers /><h3>Lista de Usarios</h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <button type="button" className="btn-crear-Paciente-tabla" onClick={modalF}>Crear Nuevo</button>
                            </div>
                        </div>

                        <hr />
                        <table className='table'>

                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Telefono</th>
                                    <th>Correo</th>
                                    <th>Cargo</th>
                                    <th> </th>
                                </tr>
                            </thead>

                            <tbody>
                                {

                                    terapeuta.map(item => [
                                        <tr>
                                            <td data-label="Nombre">{item.names}</td>
                                            <td data-label="apellido">{item.apellido}</td>
                                            <td data-label="telefono">{item.telefono}</td>
                                            <td data-label="direccion">{item.email}</td>
                                            <td data-label="direccion">{item.idRol}</td>
                                            <td className='tr-btn'>
                                                <button className='btn-tabla-usuario' type='button' value={item.idUser} onClick={e => EditarUsuario(e.target.value)}>Editar</button>
                                                <button className='btn-tabla-usuario-eliminar ' type='button' value={item.idUser} onClick={e => EliminarUsuario(e.target.value)}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ])

                                }

                            </tbody>


                        </table>


                    </div>
                </div>
            </div>




            {/* MODAL EDITAR USUARIO */}
            <div className='cont-modal-lista-usuario' ref={modalEditar}>

                <form className='form-perfil-usuario' onSubmit={enviar}>
                    <div className='cont-titu-usuario'>
                        <h1>Editar Usuario</h1>
                    </div>

                    <div className='box-con'>

                        <div className='row'>
                            <div className='col'>
                                <label>Nombre</label>
                                <input className='form-users' value={nombre} required onChange={e => setNombre(e.target.value)} />
                            </div>
                            <div className='col'>
                                <label>Apellido</label>
                                <input className='form-users' value={apellido} required onChange={e => setApellido(e.target.value)} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <label>Telefono</label>
                                <input className='form-users' value={telefono} required onChange={e => setTelefono(e.target.value)} />
                            </div>
                            <div className='col'>
                                <label>Direccion</label>
                                <input className='form-users' value={direccion} required onChange={e => setDireccion(e.target.value)} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <label>Correo</label><br></br>
                                <input className='form-users' value={correo} required onChange={e => setCorreo(e.target.value)} />
                            </div>
                            <div className='col'>
                                <label>contraseñas</label>
                                <input className='form-users' value={contraseñas} required onChange={e => setContraseñas(e.target.value)} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <select onChange={e => setIdRol(e.target.value)} values={idRol} className='form-select-usuario' required>
                                    <option defaultValue> seleccione un Rol</option>
                                    <option value="1">Administrador</option>
                                    <option value="2">Terapeuta</option>
                                    <option value="3">Usuario</option>
                                </select>
                            </div>
                        </div>


                        <div className='row'>
                            <div className='col-sm-12'>
                                <button className='btn-editar-terapia' type='submit' >Editar</button>
                                <button className='btn-eliminar-terapia' type='button' onClick={Cancelar}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* MODAL CREAR USUARIO */}

            <div className='cont-modal-crear-usuario' ref={modalCrear}>

                <form className='form-crear-usuario' onSubmit={CrearUsuario} >
                    <div className='cont-titu-crear-usuario'>
                        <h1>Crear Usuario</h1>
                    </div>

                    <div className='box-con-usuario'>

                        <div className='row'>
                            <div className='col'>
                                <label>Nombre</label>
                                <input className='form-users' required onChange={e => setNombre(e.target.value)} />
                            </div>
                            <div className='col'>
                                <label>Apellido</label>
                                <input className='form-users' required onChange={e => setApellido(e.target.value)} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <label>Telefono</label>
                                <input className='form-users' required onChange={e => setTelefono(e.target.value)} />
                            </div>
                            <div className='col'>
                                <label>Direccion</label>
                                <input className='form-users' required onChange={e => setDireccion(e.target.value)} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <label>Correo</label><br></br>
                                <input className='form-users' onChange={e => setCorreo(e.target.value)} required />
                            </div>
                            <div className='col'>
                                <label>contraseñas</label>
                                <input className='form-users' onChange={e => setContraseñas(e.target.value)} required />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <select onChange={e => setIdRol(e.target.value)} className='form-select-usuario' required>
                                    <option defaultValue> seleccione un Rol</option>
                                    <option value="1">Administrador</option>
                                    <option value="2">Terapeuta</option>
                                    <option value="3">Usuario</option>
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <input className='btn-editar-terapia' type='submit' value="Crear" />
                                <button className='btn-eliminar-terapia' type='button' onClick={Cancelar}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>


            <div className="modal-usuario-eliminar" ref={modalEliminar}>
                <div className="modal-dialog-usuario" role="document">
                    <div className="modal-content-usuario">
                        <div className="modal-header">
                            <h5 className="modal-title">Eliminar Usuario</h5>

                        </div>
                        <div className='sub-box-usuario'>
                            <div className="modal-body">
                                {
                                    <p>¿Deseas eliminar el Usuario:<span className='text-eliminar'> {nombre}</span> ?</p>
                                }
                            </div>
                            <hr></hr>
                            <div className="modal-footer">

                                <button type="button" className="btn si" data-dismiss="modal" onClick={enviarId}>Si</button>
                                <button type="button" className="btn no" onClick={Cancelar} >No</button>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Users

/*
       <td className='tr-btn'>
                                                <button className='btn-tabla-usuario' type='button' value={item.idUser} onClick={e => EditarUsuario(e.target.value)}><FaEdit /></button>
                                                <button className='btn-tabla-usuario-eliminar ' type='button' value={item.idUser} onClick={e => EliminarUsuario(e.target.value)}><FaTrash /></button>
                                            </td>

*/