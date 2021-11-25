import React from 'react'
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/HighlightOff';


export default function WorkToolbar(){
    function tempHandle() {
        return 0;
    }
    return (
        <div id="edit-toolbar">
            <Button 
                disabled={false}
                id='undo-button'
                onClick={tempHandle}
                variant="contained">
                <UndoIcon />
            </Button>
            <Button
                disabled={false} 
                id='redo-button'
                onClick={tempHandle}
                variant="contained">
                    <RedoIcon />
            </Button>
            <Button 
                disabled={false}
                id='close-button'
                onClick={tempHandle}
                variant="contained">
                    <CloseIcon />
            </Button>
        </div>
    );
}