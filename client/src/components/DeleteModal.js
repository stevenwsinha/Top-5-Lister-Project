import * as React from 'react';
import { useContext } from 'react';
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AccountErrorModal() {
  const { store } = useContext(GlobalStoreContext);
  const open = (store.listMarkedForDeletion === null) ? false : true;
  let name = "";
  if(store.listMarkedForDeletion !== null){
    name = store.listMarkedForDeletion.name
  }


  function handleClose() {
    store.unmarkListForDeletion();
  }

  function handleDelete() {
    store.deleteMarkedList();
  }

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
                Delete the {name} Top 5 List?
        </Typography>
          <Button onClick={handleDelete}>Confirm</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}