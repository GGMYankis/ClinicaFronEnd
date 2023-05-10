import React, { useState } from 'react';

import axios from 'axios';




function AgeCalculator() {





  return (
    <>
      <div className='row'>
        <div className='col'>
          <label>Nombre</label>
          <input type='text' />
        </div>
        <div className='col'>
          <label>Apellido</label>
          <input type='text' />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <label>Telefono</label>
          <input type='text' />
        </div>
        <div className='col'>
          <label>Direccion</label>
          <input type='' />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <label>Correo</label>
          <input type='' />
        </div>
        <div className='col'>
          <label>Contraseñas</label>
          <input type='password' />
        </div>
      </div>
    </>
  );
}

export default AgeCalculator;


