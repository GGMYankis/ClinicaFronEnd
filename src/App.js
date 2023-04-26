import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from "./imagenes/IMG-20230221-WA0009.png"
import { FaBars } from 'react-icons/fa'
import { BrowserRouter, Routes, Route, Link, HashRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux';
import { addUser } from './redux/userSlice';
import jwt_decode from 'jwt-decode';
import Admin from './Vistas/Admin';
import ReportesContabilidad from './Vistas/ReportesContabilidad';
import Evaluacion from './Vistas/Evaluacion';
import AgeCalculator from './AgeCalculator';
import PerfilAdmin from './Vistas/PerfilAdmin';
import ListasTerapias from './Vistas/ListasTerapias';
import Login from './Vistas/Login';
import Terapias from './Vistas/Terapias';
import Users from './Vistas/Users';
import Abono from './Vistas/Abono';
import TerapiaTerapeuta from './Vistas/TerapiaTerapeuta';
import Contabilidad from './Vistas/Contabilidad';
import ListasPacientes from './Vistas/ListasPacientes';
import Asistencias from './Vistas/Asistencias';
import Calendario from './Vistas/Calendario';
import { Protect } from './components/Protect';
import Autenticacion from './components/Autenticacion';
import { deleteToken, getToken, initAxiosInterceptors, setUsuarioM, setUsuario, getDatosUsuario,nombreUsuario } from './auth-helpers'
import 'bootstrap/dist/css/bootstrap.min.css';
const cookies = new Cookies();

initAxiosInterceptors()

function App() {


    useEffect(() => {

        getToken()

        
        async function cargarUsuario() {
            if (!getToken) {
                alert('no hay token')
            }

            try {

                axios.post('https://yankisggm12ffs-001-site1.dtempurl.com/api/Autenticacion/getUserByToken')
                    .then(res => {
                        setUsuario(res.data.idUser)
                        const user = res.data.names.substring('', 1)
                        setUsuarioM(user)
                        nombreUsuario(res.data.names)
                    })


            } catch (error) {
                console.log("error yankis")
            }
        }

        cargarUsuario()
    }, []);




    function decodeToken(tokens) {

        try {
            const decoded = jwt_decode(tokens);
            return decoded;

        } catch (err) {
            return null;
        }
    }







    /*
           const dispatch = useDispatch();
    
           useEffect(() => {
       
               fetch("https://jsonplaceholder.typicode.com/users/1")
                   .then((response) => response.json())
                   .then((data) => dispatch(addUser(data)))
           }, [])
       
       
           */

    return (



        <div className="App">
            <HashRouter>
                <Routes >
                    <Route element={<Autenticacion />}>
                        <Route index element={<Login />} />
                    </Route>
                    <Route path='/login' element={<Login />} />
                    <Route element={<Protect />}>
                        <Route exact path="/evaluacion" element={<Evaluacion />} />
                        <Route exact path="/perfilAdmin" element={<PerfilAdmin />} />
                        <Route exact path="/listasTerapias" element={<ListasTerapias />} />
                        <Route exact path="/listasPacientes" element={<ListasPacientes />} />
                        <Route exact path='/terapia' element={<Terapias />} />
                        <Route exact path="/admin" element={<Admin />} />
                        <Route exact path="/asistencias" element={<Asistencias />} />
                        <Route exact path="/calendario" element={<Calendario />} />
                        <Route exact path="/contabilidad" element={<Contabilidad />} />
                        <Route exact path="/AgeCalculator" element={<AgeCalculator />} />
                        <Route exact path="/Users" element={<Users />} />
                        <Route exact path="/abono" element={<Abono />} />
                        <Route exact path="/TerapiaTerapeuta" element={<TerapiaTerapeuta />} />
                        <Route exact path="/reportesContabilidad" element={<ReportesContabilidad />} />
                    </Route>
                </Routes>
            </HashRouter>
        </div>
    );
}


export default App;





