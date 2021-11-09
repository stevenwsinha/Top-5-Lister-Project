import * as React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import AuthContext from '../auth'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
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

export default function ErrorModal() {
  const { auth } = useContext(AuthContext);
  const history = useHistory();
  const open = (auth.errorMsg === null) ? false : true;

  function handleClose() {
    auth.setErrorMsg(null);

    const path = history.location.pathname;
    if(path.includes("top5list")){
      history.push("/");
    }
  }

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Alert severity="warning">Warning: {auth.errorMsg}</Alert>
          <Button onClick={handleClose}>OK</Button>
        </Box>
      </Modal>
    </div>
  );
}