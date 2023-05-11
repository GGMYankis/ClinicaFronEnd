import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AgeCalculator() {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    axios.get('http://yankisggm-001-site1.ctempurl.com/api/Clinica/ListaUsers')
      .then(response => {
        setData(response.data.lista)
      })
  };

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {

    const table = $('#myTable').DataTable({
      paging: true,


    });

    return () => {
      table.destroy();
    };

  }, []);


  let id = 1;
  let ids = 2;

  return (

    <div className='conTbale'>
      <table id="myTable" className="display cell-border">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>correo</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>correo</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td>jaun</td>
            <td>jaun</td>
            <td>jaun</td>
            <td>jaun</td>
            <td>jaun</td>
            <td>jaun</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AgeCalculator;


