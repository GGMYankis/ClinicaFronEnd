
import React, { useRef, useState } from 'react'
import logo from "../imagenes/IMG-20230221-WA0009.png"
import { FaBars } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Headers from '../Headers'





function Terapias() {


    const [label, setLabel] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)
    const [vali, setVali] = useState(0)
    const [value, setValue] = useState("");


    const handleTerapia = (e) => {
        setLabel(e)
        console.log(e)
    }

    const handleDescripcion = (e) => {
        setDescription(e)
        console.log(e)
    }


    const handlePrecio = (event) => {

        const regex = /^[0-9\b]+$/;


        if (event.target.value === "" || regex.test(event.target.value)) {
            setValue(event.target.value);
        }

        setPrice(event.target.value)
    }


    const data = {

        Label: label,
        Value:label,
        Description: description,
        Price: price,
        Porcentaje: porcentaje

    }


    const enviarTerapia = (e) => {

        e.preventDefault()

        function refreshPage() {
            window.location.reload();
        }


        const url = 'https://localhost:63958/api/Clinica/CrearTerapia';
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


        }).catch((error) => {
            console.log(error)
        })
    }




    return (

        <div>


            <Headers />




            <div className='cont-form-terapia' >

                <form className='form-terapias' onSubmit={enviarTerapia} id="formterapia">
                    <div className='cont-titu-Pagina-terapia'>
                        <h1>Terapia</h1>
                    </div>

                    <div className='sub-box-Terapia'>
                        <div className='cont-sub-terapia'>

                            <div className='cont-barra-tera'>
                                <label>Terapia</label>
                                <input placeholder='Nombre de la terapia' onChange={(e) => handleTerapia(e.target.value)} required />
                            </div>
                            <div className='cont-barra-tera'>
                                <label>Descripcion</label>
                                <input placeholder='Descripcion' onChange={(e) => handleDescripcion(e.target.value)} />
                            </div>
                            <div className='cont-barra-tera'>
                                <label>Precio</label>
                                <input type="text" placeholder='Precio' onChange={handlePrecio} required />
                            </div>
                            <div className='cont-barra-tera'>
                                <label>Porcentaje</label>
                                <input type="text" placeholder='Porcentaje' onChange={e => setPorcentaje(e.target.value)} required />
                            </div>
                            <button className='btn-terapia'>Guardar</button>
                        </div>
                    </div>

                </form>
            </div>




            <div className="lds-roller">
                <div></div><div></div><div></div><div></div>
                <div></div><div></div><div></div><div></div>

            </div>
        </div>

    )
}

export default Terapias
