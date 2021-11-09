import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }

    let undoStatus = true;
    if (store.listNameActive) {
        undoStatus = false;
    }
    if(store.isItemEditActive)  
        undoStatus = false;
    if(!store.canUndo())
        undoStatus = false;

    let redoStatus = true;
    if (store.listNameActive) {
        redoStatus = false;
    }
    if(store.isItemEditActive)  
        redoStatus = false;
    if(!store.canRedo())
        redoStatus = false;

    let closeStatus = true;
    if(!store.currentList) {
        closeStatus = false;
    }
    if (store.listNameActive) {
        closeStatus = false;
    }
    if(store.isItemEditActive)  
        closeStatus = false;



    return (
        <div id="edit-toolbar">
            <Button 
                disabled={!undoStatus}
                id='undo-button'
                onClick={handleUndo}
                variant="contained">
                    <UndoIcon />
            </Button>
            <Button
                disabled={!redoStatus} 
                id='redo-button'
                onClick={handleRedo}
                variant="contained">
                    <RedoIcon />
            </Button>
            <Button 
                disabled={!closeStatus}
                id='close-button'
                onClick={handleClose}
                variant="contained">
                    <CloseIcon />
            </Button>
        </div>
    )
}

export default EditToolbar;