import * as React from 'react';
import { ModalInstructor } from '../modal/modal';
import { ModalDelet } from '../modal/modalDelet';



import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { 
  RiMoreLine,
  RiPencilLine,
  RiDeleteBin7Line
} from "react-icons/ri";

export const MenuInstructor = ({
  id, 
  nombreInstructor,
  apellidoInstructor,
  estadoInstructor,
  horasSemanales,
  imagenInstructor,
  idTpoIdentificacionFK,
  numDocInst
}) => {
  
  const [open, setOpen] = React.useState(false)
  const [openModal, setOpenModal]= React.useState(false)

  const [openModalDelet, setOpenModalDelet]= React.useState(false)

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false)
  };

  const handleopenModal = ()=>{
    setOpenModal(true)
    handleClose();
  }

  const handleopenModalDelet = ()=>{
    setOpenModalDelet(true)
    handleClose();
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <RiMoreLine className='text-2xl'/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleopenModal}><span className='mx-2'><RiPencilLine/></span>Actualizar</MenuItem>
        <MenuItem onClick={handleopenModalDelet}><span className='mx-2 text-red-500'><RiDeleteBin7Line/></span>Eliminar</MenuItem>
      </Menu>
      {/* Ventana modal que ejecuta el metodo put y deja actualizar el Instructor */}
      <ModalInstructor 
        open={openModal} 
        handleClose={()=> setOpenModal(false)} 
        id={id}
        imagenInstructor={imagenInstructor}
        nombreInstructor={nombreInstructor}
        apellidoInstructor={apellidoInstructor}
        horasSemanales={horasSemanales}
        estadoInstructor={estadoInstructor}
        idTpoIdentificacionFK={idTpoIdentificacionFK}
        numDocInst={numDocInst}
      />
      {/* Ventana modale que deja eliminar al instructor  */}
      <ModalDelet
        open={openModalDelet}
        handleClose={()=> setOpenModalDelet(false)}
        id={id}
        nombreInstructor={nombreInstructor}
      />
    </div>
  );
}
