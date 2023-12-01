"use client";

import { useEffect, useState } from 'react';
import { fetchData } from '../../../data/sendRequest';
import { MenuTematica } from '../select/select';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export const TableTematica = ()=> {
  const [data, setData] = useState({tematica: []})

  useEffect(() =>{
    const fetchDataOnMount = async ()=>{
      try {
        const response = await fetchData();
        setData(response);
        console.log("Response correcto");
      } catch (error) {
        console.error('Error en la peticion', error);
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
                <p className='text-base font-bold '>Nombre</p>
              </TableCell>
              <TableCell align="left">
                <p className='text-base font-bold '>Descripcion</p>
              </TableCell>
              <TableCell align="left">
                <p className='text-base font-bold '>Estado</p>
              </TableCell>
              <TableCell align="left">
                <p className='text-base font-bold '>Horas Maximas Mensuales</p>
              </TableCell>
              <TableCell align="left">
              <p className='text-base font-bold '>Horas Maximas Semanales</p>
              </TableCell>
              <TableCell align="left">
              <p className='text-base font-bold '>Programa</p>
              </TableCell>
              <TableCell align="left">
              <p className='text-base font-bold '>Trimestre</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.tematica.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.nombreTematica}
                </TableCell>
                <TableCell align="left">{row.descripcionTematica}</TableCell>
                <TableCell align="left">{row.estadoTematica}</TableCell>
                <TableCell align="left">{row.horasMaximasM} Horas</TableCell>
                <TableCell align="left">{row.horasMaximasS} Horas</TableCell>
                <TableCell align="left">{row.idProgramaFK} Horas</TableCell>
                <TableCell align="left">Trimestre {row.trimestre}</TableCell>
                <TableCell align="left">
                  <MenuTematica
                    nombreTematica={row.nombreTematica}
                    descripcionTematica={row.descripcionTematica}
                    estadoTematica={row.estadoTematica}
                    horasMaximasM={row.horasMaximasM}
                    horasMaximasS={row.horasMaximasS}
                    idProgramaFK={row.idProgramaFK}
                    trimestre={row.trimestre}
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