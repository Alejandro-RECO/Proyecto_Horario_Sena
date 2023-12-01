import { useEffect, useState } from 'react'
import { fetchData } from './data/sendRequest';

import LayoutPage from '../../../layouts/LayoutPage';
import { Tab } from '@headlessui/react'
import { TableTrimestre} from './components/UI/Table/table';
import { ModalTrimestre } from './components/UI/modal/modal';
import { FormTrimestre } from './components/UI/form/form';


export const TrimestrePage = () => {
  // Informacion recolectada del metodo GET de nuestra bd 
  const [data, setData] = useState({ trimestres: [] })
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
      desc="Gestione los trimestres registrados"
      title={`TRIMESTRES (${data.trimestres.length})`}>
      <ModalTrimestre/>
      <Tab.Panels>
        <Tab.Panel>
        {loading && <p>Cargando...</p>}
        {error && <p>Error: {error}</p>}
        {data && (
          <TableTrimestre/>
        )}
        </Tab.Panel>
        <Tab.Panel>
          <FormTrimestre/>
        </Tab.Panel>
      </Tab.Panels>
    </LayoutPage>
  )
}
