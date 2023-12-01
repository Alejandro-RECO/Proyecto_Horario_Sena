import { API_URL } from "../../../../utils/httpRequest";

import axios from "axios";
import { TOKEN } from "../../../../utils/httpRequest";

const endpoint = "tematica";

let alertShow = false;

// GET
export const fetchData = async () => {
  if (!TOKEN) {
    window.location.href = "/";

    return null;
  }

  const headers = {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${TOKEN}`,
  }

  try {
    const response = await axios.get(`${API_URL}/${endpoint}/`, {headers})
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      if (!alertShow) {
        alert("La sesion ha caducado. Seras redirigido al inicio de sesion.");
        alertShow = true;
        window.location.href = "/";
      }
      return null;
    }
    console.error("error en el fetch", error);
    throw error;
  }
}

// PUT
export const actualizarTematica = async (id, tematicaData, handleClose) => {
  if (!TOKEN) {
    window.location.href = "/";
    return null;
  }

  const headers = {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${TOKEN}`,
  }

  try {
    if (!tematicaData.nombreTematica) {
      throw new Error("Nombre requerido");
    }
    if (!tematicaData.descripcionTematica) {
      throw new Error("Descripcion requerido");
    }
    if (
      tematicaData.estadoTematica === undefined ||
      tematicaData.estadoTematica === null
    ) {
      throw new Error("Estado requerido");
    }
    if (!tematicaData.horasMaximasM) {
      throw new Error("Horas maximas mensuales requerido");
    }
    if (!tematicaData.horasMaximasS) {
      throw new Error("Horas maximas por semana requerido");
    }
    if (!tematicaData.idProgramaFK) {
      throw new Error("ID programa requerido");
    }
    if (!tematicaData.trimestre) {
      throw new Error("Trimestre requerido");
    }

    await axios.put(`${API_URL}/${endpoint}/${id}`, tematicaData, { headers });

    handleClose();

    console.log(`Tematica con ID ${id} actualizado correctamente`);
  } catch (error) {
    console.error("TEMATICA_PATCH", error);
    if (error.response && error.response.status === 400) {
      return new Error(error.response.data.message || "Error de validación");
    } else if (error.response && error.response.status === 500) {
      return new Error("Error interno del servidor");
    } else {
      return new Error("Error desconocido");
    }
  }
};

// POST
export const registrarTematica = async (tematicaData) => {
  if (!TOKEN) {
    window.location.href = "/";
    return null;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer' ${TOKEN}`,
  };

  try {
    if (!tematicaData.nombreTematica) {
      throw new Error("Nombre requerido");
    }
    if (!tematicaData.descripcionTematica) {
      throw new Error("Descripcion requerido");
    }
    if (
      tematicaData.estadoTematica === undefined ||
      tematicaData.estadoTematica === null
    ) {
      throw new Error("Estado requerido");
    }
    if (!tematicaData.horasMaximasM) {
      throw new Error("Horas maximas mensuales requerido");
    }
    if (!tematicaData.horasMaximasS) {
      throw new Error("Horas maximas por semana requerido");
    }
    if (!tematicaData.idProgramaFK) {
      throw new Error("ID programa requerido");
    }
    if (!tematicaData.trimestre) {
      throw new Error("Trimestre requerido");
    }

    await axios.post(`${API_URL}/${endpoint}/`, tematicaData, { headers });

    console.log("Tematica registrada correctamente");
    window.location.reload();
  } catch (error) {
    console.error("REGISTER_PATCH", error);

    if (error.response && error.response.status === 400) {
      console.error("Error de validacion del servidor:", error.response.data);
    } else if (error.request) {
      console.error("Error de red:", error.message);
    } else {
      console.error(("Error desconocido:", error.message));
    }
    throw new Error("Error al resgistrar la tematica");
  }
};

// DELETE
export const eliminarTematica = (id) =>{
    if (!TOKEN) {
        window.location.href = '/?error=no_token';
        return Promise.reject(new Error('No hay token disponible'));    
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
    };

    return axios.delete(`${API_URL}/${endpoint}/${id}`, {headers})
    .then(()=>{
        console.log('Tematica con ID ${id} eliminado correctamente');
    })
    .cath((error) =>{
        console.error(`Error al eliminar la tematica con ID ${id}`, error);
        throw new Error(`Error al eliminar al instructor: ${error.message}`);
    });
};

// GET ID PROGRAMA
export const fetchDataIdPrograma = async () => {
  if (!TOKEN) {
    window.location.href = "/";

    return null;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  };

  try {
    const response = await axios.get(`${API_URL}/tipodoc/`, { headers });
    return response.data;
  } catch (error) {
    console.error("error en el fetch", error);
    throw error;
  }
};

export const fetchDataIdTrimestre = async () => {
  if (!TOKEN) {
    window.location.href = "/";

    return null;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  };

  try {
    // Cambiar URL
    const response = await axios.get(`${API_URL}/tipodoc/`, { headers });
    return response.data;
  } catch (error) {
    console.error("error en el fetch", error);
    throw error;
  }
};