
import { useState, useEffect } from 'react'
import { fetchDataTiposDoc } from '../../../data/sendRequest';
import { registrarInstructor } from '../../../data/sendRequest';

import { InputLabel } from '../../../../../../components/input/input'

export const FormInstructor = () => {
  const [nombreInstructor, setNombreInstructor] = useState('');
  const [apellidoInstructor, setApellidoInstructor] = useState('');
  const [estadoInstructor, setEstadoInstructor] = useState(1); // Valor predeterminado 1 para "Activo"
  const [horasSemanales, setHorasSemanales] = useState('');
  const [imagenInstructor, setImagenInstructor] = useState('');
  const [idTipoIdentificacionFK, setIdTipoIdentificacionFK] = useState('');
  const [numDocInst, setNumDocInst] = useState('');

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
      const instructorData = {
        nombreInstructor,
        apellidoInstructor,
        estadoInstructor,
        horasSemanales,
        imagenInstructor,
        idTipoIdentificacionFK,
        numDocInst,
      };
  
      await registrarInstructor(instructorData);
  
      // Realizar acciones adicionales después de registrar el instructor, si es necesario.
      console.log('Instructor registrado exitosamente');
    } catch (error) {
      // Manejar errores, mostrando un mensaje o realizando alguna acción específica.
      console.error('Error al registrar el instructor:', error.message);
    }
  }
  return (
    <>
      <h1 className='text-center text-2xl font-bold uppercase'>Registrar instructor</h1>
      <form 
          className='flex flex-col items-center justify-center w-[880px]'
          onSubmit={handleSubmit}>
          <div className='grid grid-cols-8 p-4 items-center justify-center gap-x-2 gap-y-2 mb-4 w-[100%]'>
            <InputLabel
              col="4"
              label={"Nombre"}
              htmlId="nomInstructor"
              value={nombreInstructor}
              onChange={setNombreInstructor} 
              inputProps={{ id: "nomInstructor" }}
              />
            <InputLabel 
              col="4"
              label={"Apellidos"}
              htmlId="apeInstructor"
              value={apellidoInstructor}
              onChange={setApellidoInstructor} 
              inputProps={{ id: "apeInstructor" }}
              />
              <InputLabel 
              col="4"
              label={"Numero Doc"}
              htmlId="numDocInst"
              value={numDocInst}
              onChange={setNumDocInst} 
              inputProps={{ id: "numDocInst" }}
              />
            <select
              className='appearance-none mt-4 col-span-4 text-lg text-gray-500 p-2 font-light rounded-sm shadow-md outline-none border'
              value={estadoInstructor}
              onChange={(e) => setEstadoInstructor(e.target.value, 10)}
            >
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
            {loading && <p>Cargando tipos de documentos...</p>}
            {error && <p>Error: {error}</p>}
            {tiposDoc && (
            <select
                className='appearance-none mt-4 col-span-4 text-lg text-gray-500 p-2 font-light rounded-sm shadow-md outline-none border'
                name="idTipoIdentificacionFK"
                value={idTipoIdentificacionFK}
                onChange={(e) => setIdTipoIdentificacionFK(e.target.value, 10)}
              >
                {
                  // Mapeo de la informacion que pertenece al parametro tipos doc en bd 
                  tiposDoc.typesdocs.map((tipo)=>(
                    <option key={tipo.idTipoIdent} value={(tipo.idTipoIdent)}>{tipo.nombreTipoIdent}</option>
                  ))
                }
              </select>
              )}
            <InputLabel 
              col="4"
              label={"Horas Semanales"}
              value={horasSemanales}
              htmlId="horInstructor"
              onChange={setHorasSemanales} 
              inputProps={{ id: "horInstructor" }}
              />
            <InputLabel 
              col="4"
              label={"Foto"}
              value={imagenInstructor}
              htmlId="imgInstructor"
              onChange={setImagenInstructor} 
              inputProps={{ id: "imgInstructor" }}
              />
          </div>
        <button className='bg-primary rounded-md text-center text-white shadow-md p-4' type="submit">Registrar Instructor</button>
      </form>
    </>
  )
}

