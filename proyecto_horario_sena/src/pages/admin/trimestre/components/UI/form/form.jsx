
import { useState, useEffect } from 'react'
import { fetchDataTiposDoc } from '../../../data/sendRequest';
import { registrarTrimestre } from '../../../data/sendRequest';

import { InputLabel } from '../../../../../../components/input/input'

export const FormTrimestre = () => {
  const [estadoTrimestre, setEstadoTrimestre] = useState('1'); // Valor predeterminado 1 para "Activo"
  const [fechaFin, setFechaFin] = useState('');
  const [fechaInicio, setFechaInicio] = useState(''); 
  const [idTrimestre, setIdTrimestre] = useState('');
  const [nombreTrimestre, setNombreTrimestre] = useState('');

  const [tiposDoc, setTipoDoc ] = useState({typesdocs: []})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataTiposD = async () => {
      try {
        setLoading(true);
        const response = await fetchDataTiposDoc();
        setTipoDoc(response);
      } catch (error) {
        console.error('Error en la petición de tipos de documentos:', error);
        setError('Error al cargar tipos de documentos');
      } finally {
        setLoading(false);
      }
    };

    fetchDataTiposD();
  }, []);



  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const trimestreData = {
        estadoTrimestre,
        fechaFin,
        fechaInicio,
        idTrimestre,
        nombreTrimestre,
      };
  
      await registrarTrimestre(trimestreData);
  
      // Realizar acciones adicionales después de registrar el instructor, si es necesario.
      console.log('trimestre registrado exitosamente');
    } catch (error) {
      // Manejar errores, mostrando un mensaje o realizando alguna acción específica.
      console.error('Error al registrar el trimestre:', error.message);
    }
  }
  return (
    <>
      <h1 className='text-center text-2xl font-bold uppercase'>Registrar trimestre</h1>
      <form 
          className='flex flex-col items-center justify-center w-[880px]'
          onSubmit={handleSubmit}>
          <div className='grid grid-cols-8 p-4 items-center justify-center gap-x-2 gap-y-2 mb-4 w-[100%]'>
            <InputLabel
              col="4"
              label={"ID"}
              htmlId="idTrimestre"
              value={idTrimestre}
              onChange={setIdTrimestre} 
              inputProps={{ id: "idTrimestre" }}
              />
            <InputLabel 
              col="4"
              label={"Fecha Fin"}
              htmlId="fechaFin"
              value={fechaFin}
              onChange={setFechaFin} 
              inputProps={{ id: "fechaFin" }}
              />
              <InputLabel 
              col="4"
              label={"Fecha Inicio"}
              htmlId="fechaInicio"
              value={fechaInicio}
              onChange={setFechaInicio} 
              inputProps={{ id: "fechaInicio" }}
              />
            <select
              className='appearance-none mt-4 col-span-4 text-lg text-gray-500 p-2 font-light rounded-sm shadow-md outline-none border'
              value={estadoTrimestre}
              onChange={(e) => setEstadoTrimestre(e.target.value, 10)}
            >
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
            <InputLabel 
              col="4"
              label={"Nombre Trimestre"}
              value={nombreTrimestre}
              htmlId="nombreTrimestre"
              onChange={setNombreTrimestre} 
              inputProps={{ id: "nombreTrimestre" }}
              />
          </div>
        <button className='bg-primary rounded-md text-center text-white shadow-md p-4' type="submit">Registrar Trimestre</button>
      </form>
    </>
  )
}

