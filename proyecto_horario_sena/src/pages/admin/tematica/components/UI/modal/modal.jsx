// "use client"

// import { useEffect, useState } from 'react';
// import { fetchDataIdPrograma } from '../../../data/sendRequest';
// import { fefetchDataIdTrimestre } from '../../../data/sendRequest';
// import { InputLabel } from '../../../../../../components/input/inputUpdate';

// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Divider from '@mui/material/Divider';

// export const ModalTematica = ({
//   open, 
//   handleClose, 
//   nombreTematica,
//   descripcionTematica,
//   horasMaximasM,
//   horasMaximasS,
//   trimestre,
//   estadoTematica,
//   idProgramaFK
// }) => {
  
//   // ALmacenamos la informacion que actualizaremos en un estado para luego enviarla al metodo PUT
  
//   const [idPrograma, setIdProgramaFK] = useState({programa: []})
//   // const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(()=>{
//     const fetchDataIdPrograma = async ()=>{
//       try{
//         const response = await fetchDataIdPrograma();
//         setIdProgramaFK(response);
//       }catch{
//         console.error('Error en la peticion:', error);
//       }
//     };
//     fetchDataIdPrograma();
//   }, []);

//   const [tematicaData, setTematicaData] = useState({
//     nombreTematica: nombreTematica,
//     descripcionTematica: descripcionTematica,
//     horasMaximasM:horasMaximasM,
//     horasMaximasS: horasMaximasS,
//     trimestre: trimestre,
//     estadoTematica: estadoTematica,
//     idProgramaFK: idProgramaFK,
//   });


// //  Almacenamos la informacion de los input en su respectiva constante
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTematicaData({
//       ...tematicaData,
//       [name]: value,
//     });
//   };

// //   // Metodo PUT para acutializar lainformacion de la tematica
// //   // Mejorar el codigo para tener buenas practicas
//   const actualizarTematica = async () => {
//     try {
//       await axios.put(`http://localhost:3000/tematica/${id}`, {
//         ...tematicaData,
//       });
//       handleClose()


//       // Manejo de errores 
//       if(!tematicaData.nombreTematica){
//         return new error ("Nombre requerido", { status: 400 })
//       }
//       if(!tematicaData.descripcionTematica){
//         return new error ("Descripción requerido", { status: 400 })
//       }
//       if(!tematicaData.horasMaximasM){
//         return new error ("Horas mensuales requerido", { status: 400 })
//       }
//       if(!tematicaData.horasMaximasS){
//         return new error ("Horas Semanales requerido", { status: 400 })
//       }
//       if(!tematicaData.trimestre){
//         return new error ("Trimestre requerido", { status: 400 })
//       }
//       if(!tematicaData.estadoTematica){
//         return new error ("Estado requerido", { status: 400 })
//       }
//       if(!tematicaData.idProgramaFK){
//         return new error ("Programa requerido", { status: 400 })
//       }

//       console.log("Tematica actualizada correctamente");
//       window.location.reload(); // Recarga la página
//     } catch (error) {
//       console.error("TEMATICA_PATCH", error);
//       return new error ("Internal error", {status: 500})
//     }
//   };


//   return (
//     <>
//       <Dialog open={open} onClose={handleClose}>
//         <div className='w-[590px]'>
//           <DialogTitle>ACTUALIZAR</DialogTitle>
//           <Divider/>
//           <DialogContent>
//             <h1 className='text-xl text-center font-semibold uppercase text-gray-500 pb-4'>{nombreTematica} | ID: {id}</h1>
//             <div className='flex items-center justify-center gap-4'>
//               <div className='grid grid-cols-8 py-4 gap-4 w-full'>
//                 <InputLabel
//                   col={4}
//                   htmlId="nombre"
//                   label="Nombre"
//                   name="nombreTematica"
//                   value={tematicaData.nombreTematica}
//                   onChange={handleInputChange}
//                 />
//                 <InputLabel
//                   col={2}
//                   htmlId="horasMaximasM"
//                   label="Horas Mensuales"
//                   name="horasMaximasM"
//                   value={tematicaData.horasMaximasM}
//                   onChange={handleInputChange}
//                 />
//                 <InputLabel
//                   col={2}
//                   htmlId="horasMaximasS"
//                   label="Horas Semanales"
//                   name="horasMaximasS"
//                   value={tematicaData.horasMaximasS}
//                   onChange={handleInputChange}
//                 />
//                 <InputLabel
//                   col={8}
//                   htmlId="descript"
//                   label="Descripción"
//                   name="descripcionTematica"
//                   value={tematicaData.descripcionTematica}
//                   onChange={handleInputChange}
//                 />
//                  <select
//                   className='shadow-lg col-span-4 p-2 border rounded-md focus:outline-none appearance-none'
//                   name="trimestre"
//                   value={tematicaData.trimestre}
//                   onChange={handleInputChange}
//                 >
//                   {
//                     // Mapeo de la informacion que pertenece al parametro tipos doc en bd 
//                     idTrimestre.map((item)=>(
//                       <option key={item.id} value={(item.id)}>{item.nombreTrimestre}</option>
//                     ))
//                   }
//                 </select>
//                 <select
//                   className='shadow-lg col-span-4 p-2 border rounded-md focus:outline-none appearance-none'
//                   name="estadoTematica"
//                   value={tematicaData.estadoTematica}
//                   onChange={handleInputChange}
//                 >
//                   <option value="1">Activo</option>
//                   <option value="0">Inactivo</option>
//                 </select>
//                 <select
//                   className='shadow-lg col-span-8 p-2 border rounded-md focus:outline-none appearance-none'
//                   name="idProgramaFK"
//                   value={tematicaData.idProgramaFK}
//                   onChange={handleInputChange}
//                 >
//                   {
//                     // Mapeo de la informacion que pertenece al parametro tipos doc en bd 
//                     idPrograma.map((item)=>(
//                       <option key={item.id} value={(item.id)}>{item.nombrePrograma}</option>
//                     ))
//                   }
//                 </select>
//               </div>
//             </div>
//           </DialogContent>
//           <DialogActions>
//             <button 
//               className='p-2 border rounded-md hover:shadow-lg transition-all'
//               onClick={actualizarTematica}>Actualizar</button>
//             <button 
//               className='p-2 bg-red-500 text-white border rounded-md hover:shadow-lg transition-all'
//               onClick={handleClose}>Cerrar</button>
//           </DialogActions>
//         </div>
//       </Dialog>

//     </>

//   )
// }
