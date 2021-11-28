import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleCreateNewList() {
        store;
    }
    
    let add = "";
    let text ="";
    if(store.sortType===null){
        add = (
            <Fab 
                color="secondary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
            );
        text = "Your Lists"
    }

    if(store.sortType === 'user'){
        // do something
    }
    return (
        <div id="top5-statusbar">
            {add}
            <Typography variant="h4" sx={{padding: 1}}>{text}</Typography>
        </div>
    );
}

export default Statusbar;