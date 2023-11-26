"use client";

import * as React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Divider from '@mui/material/Divider';


export const ModalSignOff = ({
  open,
  handleClose,
}) => {

  const navigate = useNavigate()

  const handleSignOff = ()=>{
    Cookies.remove('token')

    navigate('/login')
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <h5 className='mt-3 font-semibold text-lg uppercase pb-2'>Esta usted seguro ?</h5>
            <p className='px-2 text-gray-400'>
             ¿Esta seguro de cerrar sesión ?
            </p>
          </DialogContentText>
        </DialogContent>
        <Divider/>
        <DialogActions>
          <button
            className='p-2 border rounded-md text-gray-600 hover:shadow-lg transition-all' 
            onClick={handleClose} autoFocus>
            Cancelar
          </button>
          <button 
            className='p-2 bg-green-700 rounded-md text-white hover:shadow-lg transition-all'
            onClick={handleSignOff}>Confirmar</button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}