import React, { useState } from 'react';

import { DatePicker } from 'antd';
import moment from 'moment'
import axios from 'axios';
const { RangePicker } = DatePicker;



function AgeCalculator() {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (values) => {
    if (values) {
      const [start, end] = values;
      setStartDate(start);
      setEndDate(end);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };



  const data = {
    IdTerapeuta: 1,
    FechaInicio: startDate,
    FechaFinal: endDate
  }


  const enviar = (e) => {

    e.preventDefault()


    const url = 'https://localhost:7218/api/Clinica/Buscar'
    axios.post(url, data).then((result) => {


    })
  }


  return (
    <>
      <RangePicker onChange={handleDateChange} />
      <button onClick={enviar}>enviar</button>
    </>
  );
}

export default AgeCalculator;


//c#

/*

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class ImageController : ControllerBase
{
    private readonly string[] AllowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };

    [HttpPost("upload")]
    public async Task<IActionResult> Upload(IFormFile image)
    {
        if (image == null || image.Length == 0)
        {
            return BadRequest("Image not selected");
        }

        if (!AllowedExtensions.Any(extension => image.FileName.EndsWith(extension, StringComparison.OrdinalIgnoreCase)))
        {
            return BadRequest("Invalid file type");
        }

        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(image.FileName)}";
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await image.CopyToAsync(stream);
        }

        var imageUrl = Url.Content($"~/images/{fileName}");
        return Ok(new { url = imageUrl });
    }
}

*/