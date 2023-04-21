import Cookies from 'universal-cookie';
import React, { useEffect, useState, useRef } from 'react'
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
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import Headers from '../Headers'
import { deleteToken, getToken, initAxiosInterceptors, setUsuarioM, obtenerUser } from '../auth-helpers'


const btnColor = document.getElementById('btnColor')
const check = document.getElementById('check')
const tableContainer = document.getElementById('table-container')



function ListasPacientes() {

    const [ac, setAc] = useState([])

    useEffect(() => {
        $('#modal-paciente').hide();
        $('#foock').hide();

        const cookies = new Cookies();


        axios.get('https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/Lista')
            .then(res => {

                res.data.lista.map(item => {
                    if (item.activo == true) {

                        setlistaPaciente(item.activo = 'si')
                    }
                    if (item.activo == false) {
                        setlistaPaciente(item.activo = 'no')

                    }
                    setlistaPaciente(res.data.lista)

                })

            });
    }, []);

    obtenerUser()


    const [idPaciente, setIdPaciente] = useState()
    const [idPacienteEliminar, setIdPacienteEliminar] = useState()

    const cookies = new Cookies();
    const navigation = useNavigate();
    const [listaPaciente, setlistaPaciente] = useState([])

    const [name, setName] = useState('');
    const [sex, setSex] = useState('');
    const [parents_name, setParents_Name] = useState('');
    const [parent_or_guardian_phone_number, setParent_or_guardian_phone_number] = useState('');
    const [date_of_birth, setDate_of_birth] = useState('');
    const [age, setAge] = useState();
    const [educational_institution, setEducational_institution] = useState('');
    const [course, setCourse] = useState('');
    const [who_refers, setWho_refers] = useState('');
    const [family_settings, setFamily_settings] = useState('');
    const [therapies_or_service_you_will_receive_at_the_center, setTherapies_or_service_you_will_receive_at_the_center] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [recommendations, setRecommendations] = useState('');
    const [family_members_concerns, setFamily_members_concerns] = useState('');
    const [specific_medical_condition, setSpecific_medical_condition] = useState('');
    const [other, setOther] = useState('');
    const [idEditar, setIdEditar] = useState([]);
    const [activos, setActivo] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState("");
    const [number_Mothers, setNumber_Mothers] = useState('');
    const [NumPadre, setNumPadre] = useState("");
    const [NumMadre, setNumMadre] = useState("");

    const handleNameChange = (value) => {

        setName(value);
    }

    // Obteniendo el nombre del paciente
    const FActivo = (value) => {

        setAc(value)

        if (value == 1) {
            value = true
            setActivo(value);
            console.log('es true')
        } else {
            value = false
            setActivo(value);
            console.log('es falso')
        }

    }

    const handleSexChange = (value) => {
        setSex(value);
    }

    const handleParents_NameChange = (value) => {
        setParents_Name(value);
    }

    const handleparent_or_guardian_phone_numberChange = (value) => {


        const regex = /^[0-9\b]+$/;


        if (value.target.value === "" || regex.test(value.target.value)) {
            setNumPadre(value.target.value);
        }
        setParent_or_guardian_phone_number(value.target.value);
    }



    const handledate_of_birthChange = (event) => {

        setInputValue(event.target.value);
        setDate_of_birth(event.target.value);

    }


    function calculateAge() {
        const currentDate = new Date();
        const birthDate = new Date(inputValue);
        const differenceMs = currentDate - birthDate;
        const differenceYears = parseFloat((differenceMs / (1000 * 60 * 60 * 24 * 365)).toFixed(2));
        return differenceYears;
    }



    const handleageChange = (value) => {
        setAge(value);
    }

    const handleducational_institutionChange = (value) => {
        setEducational_institution(value);
    }

    const handleCurso = (value) => {
        setCourse(value);
    }

    const handlemothers_number = (value) => {


        const regex = /^[0-9\b]+$/;


        if (value.target.value === "" || regex.test(value.target.value)) {
            setNumMadre(value.target.value);
        }

        setNumber_Mothers(value.target.value);
    }




    const handlewho_refersChange = (value) => {
        setWho_refers(value);
    }
    const handlefamily_settingsChange = (value) => {
        setFamily_settings(value);
    }
    const handletherapies_or_service_you_will_receive_at_the_centerChange = (value) => {
        setTherapies_or_service_you_will_receive_at_the_center(value);
    }
    const handlediagnosisChange = (value) => {
        setDiagnosis(value);
    }
    const handlerecommendationsChange = (value) => {
        setRecommendations(value);
    }
    const handlefamily_members_concernsChange = (value) => {
        setFamily_members_concerns(value);
    }
    const handlespecific_medical_conditionChange = (value) => {
        setSpecific_medical_condition(value);
    }
    const handleotherChange = (value) => {
        setOther(value);
    }



    const data = ({
        Name: name,
        Sex: sex,
        ParentsName: parents_name,
        ParentOrGuardianPhoneNumber: parent_or_guardian_phone_number,
        DateOfBirth: date_of_birth,
        Age: calculateAge(),
        EducationalInstitution: educational_institution,
        NumberMothers: number_Mothers,
        Course: course,
        WhoRefers: who_refers,
        FamilySettings: family_settings,
        TherapiesOrServiceYouWillReceiveAtTheCenter: therapies_or_service_you_will_receive_at_the_center,
        Diagnosis: diagnosis,
        Recommendations: recommendations,
        FamilyMembersConcerns: family_members_concerns,
        SpecificMedicalCondition: specific_medical_condition,
        Other: other,
    })

    const handleGuardar = (e) => {

        e.preventDefault()

        const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/GuardarPaciente';
        axios.post(url, data).then((result) => {

            $('#modal-paciente').hide();
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

            $('#table-container').show();
            //  refreshPage()



        }).catch((error) => {
            console.log(error)
        })


    }


    const modalCraePaciente = () => {

        $('#modal-paciente').show();
        $('#table-container').hide();

    }




    const dataEditar = ({

        IdPatients: idPaciente,
        Name: name,
        Sex: sex,
        ParentsName: parents_name,
        ParentOrGuardianPhoneNumber: parent_or_guardian_phone_number,
        DateOfBirth: date_of_birth,
        Age: age,
        EducationalInstitution: educational_institution,
        NumberMothers: number_Mothers,
        Course: course,
        WhoRefers: who_refers,
        FamilySettings: family_settings,
        TherapiesOrServiceYouWillReceiveAtTheCenter: therapies_or_service_you_will_receive_at_the_center,
        Diagnosis: diagnosis,
        Recommendations: recommendations,
        FamilyMembersConcerns: family_members_concerns,
        SpecificMedicalCondition: specific_medical_condition,
        Other: other,
        Activo: activos
    })



    const FormularioEditar = document.getElementById("FormularioEditar");

    const handleEditar = async (e) => {

        e.preventDefault()

        console.log(dataEditar)

        const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/EditarPaciente';
        axios.put(url, dataEditar).then((result) => {

            $('#foock').hide();
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

            FormularioEditar.reset()
            $('#table-container').show();
        }).catch((error) => {
            console.log(error)
        })
    }






    const modaleditar = (e) => {

        $('#foock').show();
        $('#table-container').hide();
        setIdPaciente(e)
        const IdEditarPaciente = listaPaciente.filter(item => item.idPatients == e)

        IdEditarPaciente.map(item => {
            if (item.activo == 'si') {

                setAc(1)
                console.log('es de tipo true')
            }
            if (item.activo == 'no') {
                setAc(0)
                console.log('es de tipo false')
            }

        })



        IdEditarPaciente.map(item => [
            setName(item.name),
            setSex(item.sex),
            setParents_Name(item.parentsName),
            setParent_or_guardian_phone_number(item.parentOrGuardianPhoneNumber),
            setDate_of_birth(item.dateOfBirth.substring('', 10)),
            setAge(item.age),
            setEducational_institution(item.educationalInstitution),
            setWho_refers(item.whoRefers),
            setFamily_settings(item.familySettings),
            setTherapies_or_service_you_will_receive_at_the_center(item.therapiesOrServiceYouWillReceiveAtTheCenter),
            setDiagnosis(item.diagnosis),
            setRecommendations(item.recommendations),
            setFamily_members_concerns(item.familyMembersConcerns),
            setSpecific_medical_condition(item.specificMedicalCondition),
            setOther(item.other),
            setNumber_Mothers(item.numberMothers),
            setCourse(item.course),
            setSex(item.sex),

        ])
    }






    function refreshPage() {
        window.location.reload();
    }



    const handleEliminar = () => {

        const idPa = { IdPatients: idPacienteEliminar }

        const url = 'https://yankisggm12ffs-001-site1.dtempurl.com/api/Clinica/EliminarPaciente';
        axios.post(url, idPa).then((result) => {

            $('#eliminarPaciente').hide();
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


    const modalEliminar = (e) => {

        $('#eliminarPaciente').show();

        setIdPacienteEliminar(e)


    }

    const modalCerrarEliminar = () => {

        $('#eliminarPaciente').hide();
    }

    const CancelarPaciente = () => {

        $('#foock').hide();
        $('#modal-paciente').hide();
        $('#table-container').show();

    }


    const modal = () => {

        $('#modal-paciente').show();
    }


    const logout = () => {

       
        cookies.remove("MyCookies")
        cookies.remove("Perfil")
        cookies.remove("Usuario")
        navigation("/login")

    }

    const quitarModal = () => {
        $('#modal-paciente').hide();
        $('#foock').hide();

    }



    const crearPaciente = () => {

        navigation("/crearPaciente")

    }



    const myElement = useRef(null);

    const handleClick = () => {
        myElement.current.classList.toggle('mi-clase-css');
    };





    <input type="checkbox" id="check" onClick={handleClick} />
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
                    <Link className='Link' to="/perfilAdmin">{obtenerUser()}</Link>
                    </div>


                </div>


            </header>


            <div id='table-container' ref={myElement} className='table-container'>



                <div className='sex-tables'>


                    <div className='cont-titu-tables'>
                        <h1>Listado de Pacientes</h1>
                    </div>


                    <div className='cont-crear-paciente'  >
                        <button className="btn-crear-Paciente-tabla" onClick={modalCraePaciente}>Crear Paciente</button>
                    </div>


                    <div className='sub-2'>




                        <table className='table'>

                            <thead>
                                <tr>
                                    <th scope="col">Nombre </th>
                                    <th scope="col">Sexo</th>
                                    <th scope="col">Nombre De Los Padres</th>
                                    <th scope="col">Teléfono de los padres o tutores </th>
                                    <th scope="col">Fecha de nacimiento</th>
                                    <th scope="col">Edad</th>
                                    <th scope="col">Activo</th>
                                    <th>

                                    </th>
                                </tr>
                            </thead>



                            <tbody>
                                {

                                    listaPaciente.map(item => [
                                        <tr>
                                            <td data-label="Nombre">{item.name}</td>
                                            <td data-label="Sexo">{item.sex}</td>
                                            <td data-label="Nombre De Los Padres">{item.parentsName}</td>
                                            <td data-label="Teléfono de los padres o tutores">{item.parentOrGuardianPhoneNumber}</td>
                                            <td data-label="Fecha de nacimiento">{item.dateOfBirth.substring('', 10)}</td>
                                            <td data-label="edad">{item.age}</td>
                                            <td data-label="activo">{item.activo}</td>

                                            <td>
                                                <button className='btn ' type='button' value={item.idPatients} onClick={e => modaleditar(e.target.value)}>Editar</button>
                                                <button className='btn eliminar' type='button' value={item.idPatients} onClick={e => modalEliminar(e.target.value)}>Eliminar</button>
                                            </td>

                                        </tr>
                                    ])

                                }

                            </tbody>


                        </table>
                    </div>
                </div>

            </div>






            <div className='modal-paciente' tabIndex="-1" id="foock">
                <form onSubmit={handleEditar} id="FormularioEditar" className='contenedor-cita'>

                    <div className='cont-titulo-form'>
                        <h1>Editar Paciente </h1>
                    </div>


                    <div className='paddd'>

                        <div className="row" id='primeraFila'>
                            <div className="col">
                                <label htmlFor="validationServer01" className='labelPaciente'>Nombre</label>
                                <input type="text" className="form-control " value={name} id="validationServer01" onChange={e => handleNameChange(e.target.value)} required />
                            </div>


                            <div className="col">
                                <label htmlFor="validationServer01" className='labelPaciente'>Sexo</label>
                                <select className="form-control" required value={sex} onChange={e => handleSexChange(e.target.value)}>
                                    <option selected >seleccione una opción</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenina">Femenino</option>
                                </select>
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Nombre De Los Padres </label>
                                <input type="text" className="form-control " value={parents_name} id="validationServer02" onChange={e => handleParents_NameChange(e.target.value)} required />
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPacienteCC' >Teléfono del padre</label>
                                <input type="text" className="form-control " value={parent_or_guardian_phone_number} id="validationServer02" required onChange={e => handleparent_or_guardian_phone_numberChange(e.target.value)} />
                            </div>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPacienteCC' >Teléfono de la madre</label>
                                <input type="text" className="form-control " value={number_Mothers} id="validationServer02" required onChange={e => handlemothers_number(e.target.value)} />
                            </div>
                        </div>



                        <div className='row' id='segundaFila'>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Fecha de nacimiento</label>
                                <input type="date" className="form-control" value={date_of_birth} id="validationServer02" required onChange={handledate_of_birthChange} />
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Edad</label>
                                <input type="number" className="form-control" value={calculateAge()} id="validationServer02" />
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Centro de Estudios</label>
                                <input type="text" className="form-control " value={educational_institution} id="validationServer02" required onChange={e => handleducational_institutionChange(e.target.value)} />
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Curso</label>
                                <input type="text" className="form-control " value={course} id="validationServer02" required onChange={e => handleCurso(e.target.value)} />
                            </div>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Recomendaciones </label>
                                <input type="text" className="form-control " value={recommendations} id="validationServer02" required onChange={e => handlerecommendationsChange(e.target.value)} />
                            </div>
                        </div>



                        <div className='row' id='terceraFila'>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Quien refiere</label>
                                <input type="text" className="form-control " value={who_refers} id="validationServer02" required onChange={e => handlewho_refersChange(e.target.value)} />

                            </div>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Configuración familiar</label>
                                <input type="text" className="form-control " value={family_settings} id="validationServer02" required onChange={e => handlefamily_settingsChange(e.target.value)} />
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Terapias o servicio  </label>
                                <input type="text" className="form-control " value={therapies_or_service_you_will_receive_at_the_center} id="validationServer02" required onChange={e => handletherapies_or_service_you_will_receive_at_the_centerChange(e.target.value)} />

                            </div>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Diagnóstico </label>
                                <input type="text" className="form-control" value={diagnosis} id="validationServer02" required onChange={e => handlediagnosisChange(e.target.value)} />
                            </div>


                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Condición médica específica </label>
                                <input type="text" className="form-control " value={specific_medical_condition} id="validationServer02" required onChange={e => handlespecific_medical_conditionChange(e.target.value)} />
                            </div>

                            <div className='row'>
                                <div className="col">
                                    <label htmlFor="validationServer02" className='labelPaciente'>Activo</label>
                                    <select id="cboactivo" class="form-select" value={ac} onChange={e => FActivo(e.target.value)} >
                                        <option selected>seleccione una opción</option>
                                        <option value="1">Si</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>




                            <div className='row'>
                                <div className="col">
                                    <label htmlFor="validationServer02" className='labelPaciente'>Preocupación de los familiares</label>
                                    <input type="text" className="form-control " value={family_members_concerns} id="validationServer02" required onChange={e => handlefamily_members_concernsChange(e.target.value)} />
                                </div>
                            </div>

                            <div className='row'>

                                <div className="col">
                                    <label htmlFor="validationServer02">Otro </label>
                                    <textarea id="txtArea" rows="10" cols="70" value={other} onChange={e => handleotherChange(e.target.value)}></textarea>
                                    {/*}  <input type="text" className="form-control " id="validationServer02" required onChange={e => handleotherChange(e.target.value)} /> */}
                                </div>
                            </div>

                        </div>



                        <div className="col" id='cont-btn-admin'>
                            <button className="btn-cita">Guardar</button>
                            <button className="btn-cita" type='button' onClick={CancelarPaciente}>Cancelar</button>

                        </div>
                    </div>
                </form>
            </div>



            <div className='modal-paciente' tabIndex="-1" id='modal-paciente'>
                <form onSubmit={handleGuardar} className='contenedor-cita'>

                    <div className='cont-titulo-form'>
                        <h1>Pacientes de nuevo ingreso </h1>
                    </div>

                    <div className='paddd'>

                        <div className="row" id='primeraFila'>
                            <div className="col">
                                <label htmlFor="validationServer01" className='labelPaciente'>Nombre</label>
                                <input type="text" className="form-control " value={name} id="validationServer01" onChange={e => handleNameChange(e.target.value)} required />

                            </div>


                            <div className="col">
                                <label htmlFor="validationServer01" className='labelPaciente'>Sexo</label>
                                <select className="form-control" required onChange={e => handleSexChange(e.target.value)}>
                                    <option selected>seleccione una opción</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenina">Femenino</option>
                                </select>
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Nombre De Los Padres </label>
                                <input type="text" className="form-control " value={parents_name} id="validationServer02" onChange={e => handleParents_NameChange(e.target.value)} required />
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPacienteCC' >Teléfono del padre</label>
                                <input type="text" className="form-control " value={NumPadre} id="validationServer02" required onChange={handleparent_or_guardian_phone_numberChange} />
                            </div>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPacienteCC' >Teléfono de la madre</label>
                                <input type="text" className="form-control " value={NumMadre} id="validationServer02" required onChange={handlemothers_number} />
                            </div>
                        </div>





                        <div className='row' id='segundaFila'>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Fecha de nacimiento</label>
                                <input type="date" className="form-control " value={date_of_birth} id="validationServer02" required onChange={handledate_of_birthChange} />
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Edad</label>
                                <input type="number" className="form-control" value={calculateAge()} id="validationServer02" required />

                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Centro de Estudios</label>
                                <input type="text" className="form-control " value={educational_institution} id="validationServer02" required onChange={e => handleducational_institutionChange(e.target.value)} />
                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Curso</label>
                                <input type="text" className="form-control " value={course} id="validationServer02" required onChange={e => handleCurso(e.target.value)} />
                            </div>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Recomendaciones </label>
                                <input type="text" className="form-control " value={recommendations} id="validationServer02" required onChange={e => handlerecommendationsChange(e.target.value)} />

                            </div>
                        </div>

                        <div className='row' id='terceraFila'>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Quien refiere</label>
                                <input type="text" className="form-control " value={who_refers} id="validationServer02" required onChange={e => handlewho_refersChange(e.target.value)} />

                            </div>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Configuración familiar</label>
                                <input type="text" className="form-control " value={family_settings} id="validationServer02" required onChange={e => handlefamily_settingsChange(e.target.value)} />

                            </div>

                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Terapias o servicio  </label>
                                <input type="text" className="form-control " value={therapies_or_service_you_will_receive_at_the_center} id="validationServer02" required onChange={e => handletherapies_or_service_you_will_receive_at_the_centerChange(e.target.value)} />

                            </div>
                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Diagnóstico </label>
                                <input type="text" className="form-control" value={diagnosis} id="validationServer02" required onChange={e => handlediagnosisChange(e.target.value)} />

                            </div>


                            <div className="col">
                                <label htmlFor="validationServer02" className='labelPaciente'>Condición médica específica </label>
                                <input type="text" className="form-control " value={specific_medical_condition} id="validationServer02" required onChange={e => handlespecific_medical_conditionChange(e.target.value)} />
                            </div>



                            <div className='row'>

                                <div className="col">
                                    <label htmlFor="validationServer02" className='labelPaciente'>Preocupación de los familiares</label>
                                    <input type="text" className="form-control " value={family_members_concerns} id="validationServer02" required onChange={e => handlefamily_members_concernsChange(e.target.value)} />
                                </div>



                            </div>

                            <div className='row'>

                                <div className="col">
                                    <label htmlFor="validationServer02">Otro </label>
                                    <textarea id="txtArea" rows="10" cols="70" value={other} onChange={e => handleotherChange(e.target.value)}></textarea>
                                </div>
                            </div>

                        </div>




                        <div className="col" id='cont-btn-admin'>
                            <button className="btn-cita">Guardar</button>
                            <button className="btn-cita" type='button' onClick={CancelarPaciente}>Cancelar</button>

                        </div>
                    </div>
                </form>
            </div>


            <div className="modal" id='eliminarPaciente' >

                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Eliminar Paciente</h5>

                        </div>
                        <div className="modal-body">
                            {

                                <p>¿Deseas  eliminar este Paciente?</p>

                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={modalCerrarEliminar}>No</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={handleEliminar}>Si</button>
                        </div>
                    </div>
                </div>
            </div>





        </div >
    )


}

export default ListasPacientes
