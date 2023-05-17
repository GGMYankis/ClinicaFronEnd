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
import Gastos from './Vistas/Gastos';
import AbonoTerapias from './Vistas/AbonoTerapias';
import Evaluacion from './Vistas/Evaluacion';
import { Spinner } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VerGanancias from './Vistas/VerGanancias';
import PagoTerapeutas from './Vistas/PagoTerapeutas';
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
import { deleteToken, getToken, initAxiosInterceptors, setUsuarioM, setUsuario, getDatosUsuario, nombreUsuario } from './auth-helpers'
import { Loading, LoaLogin, LoaAll } from './components/Loading';

initAxiosInterceptors()

function App() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        let token = getToken()

        async function cargarUsuario() {

            try {
                if (token) {
                    axios.post('http://yankisggm-001-site1.ctempurl.com/api/Autenticacion/getUserByToken')
                        .then(res => {
                            setUsuario(res.data.idUser)
                            const user = res.data.names.substring('', 1)
                            setUsuarioM(user)
                            nombreUsuario(res.data.names)

                        }).catch(error => {

                          

                        });
                }



            } catch (error) {
                console.log(error)
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

            {isLoading ?
                <LoaAll />
                :
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
                            <Route exact path="/gastos" element={<Gastos />} />
                            <Route exact path="/verGanancias" element={<VerGanancias />} />
                            <Route exact path="/AbonoTerapias" element={<AbonoTerapias />} />
                            <Route exact path="/PagoTerapeutas" element={<PagoTerapeutas />} />


                        </Route>
                    </Routes>
                </HashRouter>
            }


            {/*
            <div className='cont-footer-web'>
                <p>Contactanos en SaraClinica@gmail.com</p>
            </div>
            */}
        </div>

    );
}


export default App;


/* setTimeout(() => {
    setIsLoading(false);
}, 2000);
 */