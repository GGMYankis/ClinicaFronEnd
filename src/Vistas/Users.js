
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Headers from '../Headers'
import $ from 'jquery';
import swal from 'sweetalert';


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


    function refreshPage() {
        window.location.reload();
    }


    useEffect(() => {
        $('#form-perfil').hide();

        axios.get('https://localhost:63958/api/Clinica/ListaUsers')

            .then(response => {

                setTerapeuta(response.data.lista)
                // console.log(response.data.lista)
            })

    }, []);


    const data = {
        IdUser: idUser,
        Names: nombre,
        Apellido: apellido,
        Telefono: telefono,
        Direccion: direccion,
        Email: correo,
        Password: contraseñas,
        IdRol: idRol
    };

    function enviar(e) {

        e.preventDefault()
        console.log(data)

        const url = 'https://localhost:63958/api/Clinica/GuardarUsers';
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



    function EditarUsuario(valor) {

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
        $('#form-perfil').show();

        setIdUser(valor)

    }
    function EliminarUsuario(e) {
        $('#form-perfil').hide();


    }





    return (
        <div>


            <Headers />


            <div className='contCard'>
                <div class="card">
                    <div class="card-header">
                        <i class="fas fa-users me-1"></i>Lista de Usarios
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-6">
                                <button type="button" class="btn btn-success" >Crear Nuevo</button>
                            </div>

                        </div>

                        <hr />
                        <table id="tablaUsuarios" class="display cell-border" >
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Telefono</th>
                                    <th>Direccion</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {

                                    terapeuta.map(item => [
                                        <tr>
                                            <td data-label="Nombre">{item.names}</td>
                                            <td data-label="apellido">{item.apellido}</td>
                                            <td data-label="telefono">{item.telefono}</td>
                                            <td data-label="direccion">{item.direccion}</td>

                                            <td>
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

            <div className='cont-modal-lista-terapia' id="form-perfil">

                <form className='form-perfil-terapi' id="FormularioEditarTherapy" >
                    <div className='cont-titu-terapia'>
                        <h1>Editar Usuario</h1>
                    </div>

                    <div className='box-con'>

                        <div className='row'>
                            <div className='col'>
                                <label>Nombre</label>
                                <input className='form-users' value={nombre} onChange={e => setNombre(e.target.value)} />
                            </div>
                            <div className='col'>
                                <label>Apellido</label>
                                <input className='form-users' value={apellido} onChange={e => setApellido(e.target.value)} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <label>Telefono</label>
                                <input className='form-users' value={telefono} onChange={e => setTelefono(e.target.value)} />
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
                                <select onChange={e => setIdRol(e.target.value)} values={idRol} className='form-select' required>
                                    <option selected> seleccione un Rol</option>
                                    <option value="1">Administrador</option>
                                    <option value="2">Terapeuta</option>
                                    <option value="3">Usuario</option>
                                </select>
                            </div>
                        </div>


                        <div className='row'>
                            <div className='col-sm-12'>
                                <button className='btn-editar-terapia' onClick={enviar} >Editar</button>
                                <button className='btn-eliminar-terapia' type='button' onClick={EliminarUsuario}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Users
