import { useContext } from 'react'
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
        store.createNewList();
    }
    
    let add = "";
    let text ="";
    if(store.loadType==='home'){
        add = (
            <Fab 
                disabled={store.listBeingEdited ? true: false}
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
    else if (store.loadType === "username") {
        text = "Lists from user: " + store.searchUsername;
    }
    else if (store.loadType === "all"){
        text = "All " + store.searchFilter + " Lists";
    }
    else if (store.loadType === "community"){
        text = "Community Lists"
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