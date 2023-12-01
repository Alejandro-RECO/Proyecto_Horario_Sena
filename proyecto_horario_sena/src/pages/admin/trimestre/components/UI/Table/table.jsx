"use client";

import {useState, useEffect} from 'react';
import { fetchData } from '../../../data/sendRequest';
import {MenuTrimestre} from '../select/select';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export const TableTrimestre = ()=> {
  // Almacena la informacion traida desde la peticion get
  const [data, setData] = useState({ trimestres: [] })


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
                <p className='text-base font-bold '>Id Trimestre</p>
              </TableCell>
              <TableCell align='center'>
                <p className='text-base font-bold '>estado Trimestre</p>
              </TableCell>
              <TableCell align='center'>
                <p className='text-base font-bold '>Fecha Fin</p>
              </TableCell>
              <TableCell align='center'>
                <p className='text-base font-bold '>Fecha Inicio</p>
              </TableCell>
              <TableCell align='center'>
                <p className='text-base font-bold '>Nombre Trimestre</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* mapeamos la informacion retornada desde el get y las mostramos cada una  */}
            {data.trimestres.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.idTrimestre}
                </TableCell>
                <TableCell align="center">{row.estadoTrimestre === 1 ? "Activo": (row.estadoTrimestre === 0 ? "Inactivo" : "undefined")}</TableCell>
                <TableCell align="center">{row.fechaFin}</TableCell>
                <TableCell align="center">{row.fechaInicio}</TableCell>
                <TableCell align="center">{row.nombreTrimestre}</TableCell>

                <TableCell align="center">
                  {/* Modal que nos permie actualizar y eliminar la informacion del instructor mediante el id */}
                  <MenuTrimestre
                    id={row.idTrimestre}
                    estadoTrimestre={row.estadoTrimestre}
                    fechaFin={row.fechaFin}
                    fechaInicio={row.fechaInicio}
                    nombreTrimestre={row.nombreTrimestre}
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