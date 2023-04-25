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
import { deleteToken, getToken, initAxiosInterceptors, setUsuarioM, setUsuario, getDatosUsuario, setToken } from '../auth-helpers';



function TerapiaTerapeuta() {

    const [data, setData] = useState([]);
    const [terapeuta, setTerapeuta] = useState([])
    const [nombreTerapeuta, setNombreTerapeuta] = useState([])
    const [nombreTerapia, setNombreTerapia] = useState([])
    const [pro, setPro] = useState([])
    const [datass, setDatass] = useState([]);

    useEffect(() => {

        axios.get('https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/terapeuta')

            .then(response => {

                setTerapeuta(response.data.usuarios)
            })


        axios.get('https://localhost:63958/api/Clinica/ListaTerapia')
            .then(response => {
                setData(response.data.lista)
            });

    }, []);




    // Idterapeuta: nombreTerapeuta,
    //Idtherapia: nombreTerapia


    const datos = {
        teras: 
         datass
        ,
        id: nombreTerapeuta
      }
    const enviars = (e) => {

        e.preventDefault()

        const url = 'https://localhost:63958/api/Clinica/Post'
        axios.post(url,datos ).then((result) => {

            if (result) {
                swal({

                    title: "Correcto",
                    text: "Cambio guardado ",
                    icon: "success",

                });
            }
        })
    }


   

  

    function handle(selectedItems) {
        const ids = [];

        selectedItems.map(item => {
            ids.push(item.idTherapy)
        })

        setDatass(ids)

        /*
        const flavors = [];

        for (let i = 0; i < selectedItems.length; i++) {

            flavors.push(selectedItems[i].value);
        }

        setDatass(flavors)
    
       )    */
    }


    return (

        <div >
            <div className='cont-asignar'>

                <div className='form-asignar'>

                    <div className='row'>
                        <div className='col'>
                            <select required className='asignarBarra' onChange={e => setNombreTerapeuta(e.target.value)} >
                                {
                                    terapeuta.map(item => [
                                        <option value={item.idUser}>{item.names}</option>

                                    ])
                                }
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <Select
                                isMulti
                                options={data}
                                onChange={handle}

                            />
                        </div>
                    </div>
                    <button className='btn-buscar-citas' onClick={enviars}>Buscar</button>
                </div>
            </div>

        </div>
    )
}

export default TerapiaTerapeuta