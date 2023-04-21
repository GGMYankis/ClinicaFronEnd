
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Headers from '../Headers'
import $ from 'jquery';

function Users() {

    const [terapeuta, setTerapeuta] = useState([])
    const [accion, setAccion] = useState(0)
    const [idUser, setIdUser] = useState(0)




    useEffect(() => {

        axios.get('https://yanclinic.somee.com/api/Clinica/terapeuta')

            .then(response => {

                setTerapeuta(response.data.usuarios)
                console.log(response.data.usuarios)
            })

    }, []);



    function FAccion(e) {

        
        if (e  == 'terapeuta') {
            setAccion(2)
        } else {
            setAccion(1)
        }

    }


    function enviar() {

        const data = {
            IdUser: 3,
            IdRol: accion
        };


        const url = 'https://localhost:7218/api/Clinica/GuardarUsers';

        axios.post(url, data).then((result) => {


        })

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
                            <div class="col-12">
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
                                    <th>Accion</th>
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
                                                <button className='btn ' type='button' value={item.idUser} onClick={e => FAccion(e.target.value)}>Editar</button>
                                            </td>

                                        </tr>
                                    ])

                                }

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>


            <select onChange={e => FAccion(e.target.value)} required>
                <option selected> seleccione su accion</option>
                <option value="terapeuta">terapeuta</option>
                <option value="admin">admin</option>
            </select>

            <button onClick={enviar}>enviar</button>

        </div>
    )
}

export default Users
