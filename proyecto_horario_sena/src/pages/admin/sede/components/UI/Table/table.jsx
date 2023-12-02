"use client";

import {useState, useEffect} from 'react';
import { fetchData } from '../../../data/sendRequest';
import {MenuSede} from '../select/select';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




export const TableSede = ()=> {
  // Almacena la informacion traida desde la peticion get
  const [data, setData] = useState({ sedes: [] })


  useEffect(() => {
    const fetchDataOnMount = async () => {
      try {
        const response = await fetchData();
        setData(response);
        console.log("Response correcto")
      } catch (error) {
        console.error('Error en la petición:', error);
      }
    };

    fetchDataOnMount();
  }, []); 

  return (
    <div className='pt-2 border border-gray-200 rounded-lg'>
      <TableContainer component={Paper} className="overflow-x-auto">
        <Table sx={{ minWidth: 1030}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <p className='text-base font-bold '>Nombre Sede</p>
              </TableCell>
              <TableCell align='center'>
                <p className='text-base font-bold '> Direccion Sede</p>
              </TableCell>
              <TableCell align='center'>
                <p className='text-base font-bold '>Estado Sede</p>
              </TableCell>
              <TableCell align='center'>
                <p className='text-base font-bold '>ID Sede</p>
              </TableCell>
              <TableCell align='center'>
                <p className='text-base font-bold '>Imagen Sede</p>
              </TableCell>
              <TableCell align="right">
              <p className='text-base font-bold '>Localidad</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* mapeamos la informacion retornada desde el get y las mostramos cada una  */}
            {data.sedes.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.nombreSede}
                </TableCell>
                <TableCell align="center">{row.direccionSede}</TableCell>
                <TableCell align="center">{row.idSede}</TableCell>
                <TableCell align="center">{row.estadoSede === 1 ? "Activo": (row.estadoInstructor === 0 ? "Inactivo" : "undefined")}</TableCell>
                <TableCell align="center">{row.imagenSede} </TableCell>
                <TableCell align="center">{row.idLocalidadFK}</TableCell>
                <TableCell align="center">
                  {/* Modal que nos permie actualizar y eliminar la informacion del instructor mediante el id */}
                  <MenuSede 
                    id={row.idSede}
                    imagenSede={row.imagenSede}
                    nombreSede={row.nombreSede}
                    direccionSede={row.direccionSede}
                    estadoSede={row.estadoSede}
                    idLocalidadFK={row.idLocalidadFK}
                    />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}