import React from 'react'

export default function WorkToolbar(){
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
}