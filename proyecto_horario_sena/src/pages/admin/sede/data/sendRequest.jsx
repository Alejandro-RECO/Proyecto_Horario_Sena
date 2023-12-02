// Url sin end Point
import { API_URL } from '../../../../utils/httpRequest';


import axios from 'axios'
import { TOKEN } from '../../../../utils/httpRequest';

const endpoint = 'sede';

let alertShow = false;


// GET
export const fetchData = async ()=>{

  if (!TOKEN){
    window.location.href = '/'

    return null
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
  }
  try{
    const response = await axios.get(`${API_URL}/${endpoint}/`, {headers})
    return response.data
  }catch (error){

    if (error.response && error.response.status === 401) {
      if (!alertShow) {
        // Aquí podrías intentar renovar el token o redirigir al usuario a la página de inicio de sesión
        // Si tu backend admite la renovación de tokens, podrías implementar esa lógica aquí
        alert('La sesión ha caducado. Serás redirigido al inicio de sesión.');
        alertShow = true; // Marcar que la alerta ha sido mostrada
        window.location.href = '/'; // Ajusta la URL según tu estructura de rutas
      }
      return null;
    }

    console.error("erro en el fetch", error)
    throw error;
  }
}


// Metodo PUT 
export const actualizarSede = async (id, sedeData, handleClose) => {
  if (!TOKEN) {
    window.location.href = '/';
    return null;
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
  };

  try {
    // Validación de campos
    if (!sedeData.nombreSede) {
      throw new Error("Nombre requerido");
    }
    if (!sedeData.direccionSede) {
      throw new Error("Direccion requerida");
    }
    if (sedeData.estadoSede === undefined || sedeData.estadoSede === null) {
      throw new Error("Estado requerido");
    }
    if (!sedeData.idLocalidadFK) {
      throw new Error("Localidad requerida");
    }
    if (!sedeData.imagenSede) {
      throw new Error("Imagen requerida");
    }

    // Realizar la solicitud PUT
    await axios.put(`${API_URL}/${endpoint}/${id}`, sedeData, { headers });

    // Cierre del modal u otra acción después de la actualización
    handleClose();

    console.log(`Sede con ID ${id} actualizado correctamente`);
  } catch (error) {
    console.error("SEDE_PATCH", error);

    // Manejo específico de errores
    if (error.response && error.response.status === 400) {
      // Errores de validación del servidor
      return new Error(error.response.data.message || "Error de validación");
    } else if (error.response && error.response.status === 500) {
      // Otros errores del servidor
      return new Error("Error interno del servidor");
    } else {
      // Otros errores
      return new Error("Error desconocido");
    }
  }
};

  
//   Metodo POST 
export const registrarSede = async (sedeData) => {
  if (!TOKEN){
    window.location.href = '/'
    return null
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
  }

  try {
    // Validación de campos
    if (!sedeData.nombreSede) {
      throw new Error("Nombre requerido");
    }
    if (!sedeData.direccionSede) {
      throw new Error("Direccion requerida");
    }
    if (sedeData.estadoSede === undefined || sedeData.estadoSede === null) {
      throw new Error("Estado requerido");
    }
    if (!sedeData.idLocalidadFK) {
      throw new Error("Localidad requerida");
    }
    if (!sedeData.imagenSede) {
      throw new Error("Imagen requerida");
    }


    await axios.post(`${API_URL}/${endpoint}/`,
      sedeData,
      {headers}
    );

    console.log("Sede registrado correctamente");
    window.location.reload(); // Recarga la página
  } catch (error) {
    console.error("REGISTER_PATCH", error);

    if (error.response && error.response.status === 400) {
      // Manejar errores de validación del servidor
      console.error("Error de validación del servidor:", error.response.data);
    } else if (error.request) {
      // Error de red (sin respuesta del servidor)
      console.error("Error de red:", error.message);
    } else {
      // Otros errores
      console.error("Error desconocido:", error.message);
    }
    throw new Error("Error al registrar la sede");
  }
};

// Metodo DELETE 
export const eliminarSede = (id) => {
  if (!TOKEN) {
    window.location.href = '/?error=no_token';
    return Promise.reject(new Error('No hay token disponible.'));
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
  };

  return axios.delete(`${API_URL}/${endpoint}/${id}`, { headers })
    .then(() => {
      console.log(`Sede con ID ${id} eliminado correctamente`);
    })
    .catch((error) => {
      console.error(`Error al eliminar la sede con ID ${id}`, error);
      throw new Error(`Error al eliminar la sede: ${error.message}`);
    });
};


// GET Tipo de Dato
export const fetchDataLocalidad = async ()=>{

  if (!TOKEN){
    window.location.href = '/'

    return null
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
  }
  try{
    const response = await axios.get(`${API_URL}/localidad/`, {headers})
    return response.data
  }catch (error){
    console.error("error en el fetch", error)
    throw error;
  }
}
