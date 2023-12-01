"use client";


import { useEffect, useState } from 'react'
import { fetchDataTiposDoc } from '../../../data/sendRequest';
import { InputLabel } from '../../../../../../components/input/inputUpdate';
import { actualizarTrimestre } from '../../../data/sendRequest';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';

export const ModalTrimestre = ({
  open, 
  handleClose,
  id, 
  estadoTrimestre,
  fechaFin,
  fechaInicio,
  // idTrimestre,
  nombreTrimestre,
}) => {
  
  // ALmacenamos la informacion que actualizaremos en un estado para luego enviarla al metodo PUT
  
  const [tiposDoc, setTipoDoc ] = useState({typesdocs: []})
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataTiposD = async () => {
      try {
        const response = await fetchDataTiposDoc();
        setTipoDoc(response);
      } catch (error) {
        console.error('Error en la petición:', error);
      }
    };

    fetchDataTiposD();
  }, []); 

  const [trimestreData, setTrimestreData] = useState({
    estadoTrimestre: estadoTrimestre,
    fechaFin: fechaFin,
    fechaInicio:fechaInicio,
    nombreTrimestre: nombreTrimestre,
  });


//  Almacenamos la informacion de los input en su respectiva constante
const handleInputChange = (e) => {
  if (e && e.target && e.target.name) {
    const { name, value } = e.target;
    setTrimestreData({
      ...trimestreData,
      [name]: value,
    });
  }
};
  // Metodo PUT para acutializar lainformacion del instructor
  const handleActualizarTrimestre = async () => {
    setLoading(true);

    try {
      await actualizarTrimestre(id, trimestreData, handleClose);
      window.location.reload()
    } catch (error) {
      console.error("Error al actualizar el trimestre:", error.message);
      setError(error.message || 'Error al actualizar el trimestre');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ACTUALIZAR</DialogTitle>
        <Divider/>
        <DialogContent>
          <h1 className='text-xl text-center font-semibold uppercase text-gray-500 pb-4'>{nombreTrimestre} | ID: {id}</h1>
          <div className='flex items-center justify-center py-4 gap-4'>
            {/* <img 
              className='object-cover h-[150px] w-[150px] rounded-md shadow-lg '
              src={imagenInstructor} alt={nombreInstructor} /> */}
            <div className='grid grid-cols-4 py-4 gap-4'>
              <InputLabel
                col={2}
                htmlId="fecha Fin"
                label="Fecha Fin"
                name="fechaFin"
                value={trimestreData.fechaFin}
                onChange={handleInputChange}
              />
              <InputLabel
                col={2}
                htmlId="fecha Inicio"
                label="Fecha Inicio"
                name="fechaInicio"
                value={trimestreData.fechaInicio}
                onChange={handleInputChange}
              />
              <InputLabel
                col={4}
                htmlId="nombreTrimestre"
                label="Nombre Trimestre"
                name="nombreTrimestre"
                value={trimestreData.nombreTrimestre}
                onChange={handleInputChange}
              />
              {<select
                className='shadow-lg col-span-2 p-2 border rounded-md focus:outline-none appearance-none'
                name="estadoTrimestre"
                value={trimestreData.estadoTrimestre}
                onChange={handleInputChange}
              >
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>
              
              
              
              
              
              /* 
              <select
                className='shadow-lg col-span-2 p-2 border rounded-md focus:outline-none appearance-none'
                name="estadoInstructor"
                value={trimestreData.estadoTrimestre}
                onChange={handleInputChange}
              >
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>
              <select
                className='shadow-lg col-span-2 p-2 border rounded-md focus:outline-none appearance-none'
                name="idTpoIdentificacionFK"
                value={trimestreData.idTpoIdentificacionFK}
                onChange={handleInputChange}
              >
                {
                  // Mapeo de la informacion que pertenece al parametro tipos doc en bd 
                  tiposDoc.typesdocs.map((tipo)=>(
                    <option key={tipo.idTipoIdent} value={(tipo.idTipoIdent)}>{tipo.nombreTipoIdent}</option>
                  ))
                }
              </select> }
              {<InputLabel
                col={2}
                htmlId="horas"
                label="Horas Semanales"
                name="horasSemanales"
                value={trimestreData.horasSemanales}
                onChange={handleInputChange}
              />
              <InputLabel
                col={2}
                htmlId="Imagen"
                label="Url Imagen"
                name="imagenInstructor"
                value={instructorData.imagenInstructor}
                onChange={handleInputChange}
              /> */
              }
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button 
            className='p-2 border rounded-md hover:shadow-lg transition-all'
            onClick={handleActualizarTrimestre} disabled={loading}>Actualizar</button>
          <button 
            className='p-2 bg-red-500 text-white border rounded-md hover:shadow-lg transition-all'
            onClick={handleClose}>Cerrar</button>
        </DialogActions>
        {loading && <p className='text-center'>Actualizando...</p>}
        {error && <p className='text-center text-red-500'>Error: {error}</p>}
      </Dialog>
    </>

  )
}
