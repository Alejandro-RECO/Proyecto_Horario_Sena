"use client";


import { useState, useEffect } from 'react'
// import { fetchDataTiposDoc } from '../../../data/sendRequest';
import { InputLabel } from '../../../../../../components/input/inputUpdate';
import { actualizarSede } from '../../../data/sendRequest';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';

import { fetchDataLocalidad } from '../../../data/sendRequest';

export const ModalSede = ({
  open, 
  handleClose,
  id, 
  imagenSede,
  nombreSede,
  direccionSede,
  estadoSede,
  idLocalidadFK
}) => {
  
  // ALmacenamos la informacion que actualizaremos en un estado para luego enviarla al metodo PUT
  
  const [localidades, setLocalidad ] = useState({localidades: []})
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  


  const [sedeData, setSedeData] = useState({
    id:id, 
    imagenSede:imagenSede,
    nombreSede:nombreSede,
    direccionSede:direccionSede,
    estadoSede:estadoSede,
    idLocalidadFK:idLocalidadFK
  });


  useEffect(() => {
    const fetchDataLocalidades = async () => {
      try {
        setLoading(true);
        const response = await fetchDataLocalidad();
        setLocalidad(response);
      } catch (error) {
        console.error('Error en la petición de las localidades:', error);
        setError('Error al cargar localidades');
      } finally {
        setLoading(false);
      }
    };

    fetchDataLocalidades();
  }, []);




//  Almacenamos la informacion de los input en su respectiva constante
const handleInputChange = (e) => {
  if (e && e.target && e.target.name) {
    const { name, value } = e.target;
    setSedeData({
      ...sedeData,
      [name]: value,
    });
  }
};
  // Metodo PUT para acutializar lainformacion del instructor
  const handleActualizarSede = async () => {
    setLoading(true);

    try {
      await actualizarSede(id, sedeData, handleClose);
      window.location.reload()
    } catch (error) {
      console.error("Error al actualizar la sede:", error.message);
      setError(error.message || 'Error al actualizar la sede');
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
          <h1 className='text-xl text-center font-semibold uppercase text-gray-500 pb-4'>{nombreSede} | ID: {id}</h1>
          <div className='flex items-center justify-center py-4 gap-4'>
            <img 
              className='object-cover h-[150px] w-[150px] rounded-md shadow-lg '
              src={imagenSede} alt={nombreSede} />
            <div className='grid grid-cols-4 py-4 gap-4'>
              <InputLabel
                col={2}
                htmlId="nombre"
                label="Nombre"
                name="nombreSede"
                value={sedeData.nombreSede}
                onChange={handleInputChange}
              />
              <InputLabel
                col={2}
                htmlId="direccionSede"
                label="Direccion sede"
                name="direccionSede"
                value={sedeData.direccionSede}
                onChange={handleInputChange}
              />
              <select
                className='shadow-lg col-span-2 p-2 border rounded-md focus:outline-none appearance-none'
                name="estadoSede"
                value={sedeData.estadoSede}
                onChange={handleInputChange}
              >
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>

              <select
                className='appearance-none mt-4 col-span-4 text-lg text-gray-500 p-2 font-light rounded-sm shadow-md outline-none border'
                name="idLocalidadFK"
                value={sedeData.idLocalidadFK}
                onChange={handleInputChange}
              >
                {
                  // Mapeo de la informacion que pertenece al parametro tipos doc en bd 
                  localidades.localidades.map((localidad)=>(
                    <option key={localidad.idLocalidad} value={(localidad.idLocalidad)}>{localidad.nombreLocalidad}</option>
                  ))
                }
              </select>
              <InputLabel
                col={2}
                htmlId="imagenSede"
                label="Url Sede"
                name="imagenSede"
                value={sedeData.imagenSede}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button 
            className='p-2 border rounded-md hover:shadow-lg transition-all'
            onClick={handleActualizarSede} disabled={loading}>Actualizar</button>
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
