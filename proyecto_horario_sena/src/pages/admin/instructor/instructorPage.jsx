import { useEffect, useState } from 'react'
import { fetchData } from './data/sendRequest';

import LayoutPage from '../../../layouts/LayoutPage';
import { Tab } from '@headlessui/react'
import { TableInstructor} from './components/UI/Table/table';
import { ModalInstructor } from './components/UI/modal/modal';
import { FormInstructor } from './components/UI/form/form';


export const InstructorPage = () => {
  // Informacion recolectada del metodo GET de nuestra bd 
  const [data, setData] = useState({ instructores: [] })
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    let isMounted = true;

    const fetchDataOnMount = async () => {
      try {
        const response = await fetchData();
        if (isMounted) {
          setData(response);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error en la petición:', error);
          setError(error.message || 'Error en la petición');
        }
      } finally {
        // Indicar que la carga ha finalizado, independientemente del resultado
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDataOnMount();

    // Función de limpieza para cancelar la solicitud si el componente se desmonta
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <LayoutPage 
      desc="Gestione los instructores registrados"
      title={`INSTRUCTORES (${data.instructores.length})`}>
      <ModalInstructor/>
      <Tab.Panels>
        <Tab.Panel>
        {loading && <p>Cargando...</p>}
        {error && <p>Error: {error}</p>}
        {data && (
          <TableInstructor/>
        )}
        </Tab.Panel>
        <Tab.Panel>
          <FormInstructor/>
        </Tab.Panel>
      </Tab.Panels>
    </LayoutPage>
  )
}
