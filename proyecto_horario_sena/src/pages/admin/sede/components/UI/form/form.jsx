
import { useState, useEffect } from 'react'
// import { fetchDataTiposDoc } from '../../../data/sendRequest';
import { registrarSede } from '../../../data/sendRequest';

import { InputLabel } from '../../../../../../components/input/input'

import { fetchDataLocalidad } from '../../../data/sendRequest';

export const FormInstructor = () => {
  const [nombreSede, setNombreSede] = useState('');
  const [direccionSede, setDireccionSede] = useState('');
  const [estadoSede, setEstadoSede] = useState(1); // Valor predeterminado 1 para "Activo"
  const [imagenSede, setImagenSede] = useState('');
  const [idLocalidadFK, setIdLocalidadFK] = useState('');

  const [localidades, setLocalidad ] = useState({localidades: []})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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



  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const sedeData = {
        imagenSede,
        nombreSede,
        direccionSede,
        estadoSede,
        idLocalidadFK
      };
  
      await registrarSede(sedeData);
  
      // Realizar acciones adicionales después de registrar el instructor, si es necesario.
      console.log('Sede registrada exitosamente');
    } catch (error) {
      // Manejar errores, mostrando un mensaje o realizando alguna acción específica.
      console.error('Error al registrar la sede:', error.message);
    }
  }
  return (
    <>
      <h1 className='text-center text-2xl font-bold uppercase'>Registrar sede</h1>
      <form 
          className='flex flex-col items-center justify-center w-[880px]'
          onSubmit={handleSubmit}>
          <div className='grid grid-cols-8 p-4 items-center justify-center gap-x-2 gap-y-2 mb-4 w-[100%]'>
            <InputLabel
              col="4"
              label={"Nombre Sede"}
              htmlId="nomSede"
              value={nombreSede}
              onChange={setNombreSede} 
              inputProps={{ id: "nomSede" }}
              />
            <InputLabel 
              col="4"
              label={"Direccion sede"}
              htmlId="direccionSede"
              value={direccionSede}
              onChange={setDireccionSede} 
              inputProps={{ id: "direcSede" }}
              />
            <select
              className='appearance-none mt-4 col-span-4 text-lg text-gray-500 p-2 font-light rounded-sm shadow-md outline-none border'
              value={estadoSede}
              onChange={(e) => setEstadoSede(e.target.value, 10)}
            >
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>

            <select
                className='appearance-none mt-4 col-span-4 text-lg text-gray-500 p-2 font-light rounded-sm shadow-md outline-none border'
                name="idLocalidadFK"
                value={idLocalidadFK}
                onChange={(e) => setIdLocalidadFK(e.target.value, 10)}
              >
                {
                  // Mapeo de la informacion que pertenece al parametro tipos doc en bd 
                  localidades.localidades.map((localidad)=>(
                    <option key={localidad.idLocalidad} value={(localidad.idLocalidad)}>{localidad.nombreLocalidad}</option>
                  ))
                }
              </select>
            <InputLabel 
              col="4"
              label={"Foto"}
              value={imagenSede}
              htmlId="imgSede"
              onChange={setImagenSede} 
              inputProps={{ id: "imgSede" }}
              />
          </div>
        <button className='bg-primary rounded-md text-center text-white shadow-md p-4' type="submit">Registrar Sede</button>
      </form>
    </>
  )
}

