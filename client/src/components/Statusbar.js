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
    const history = useHistory();

    function handleCreateNewList() {
        return 0;
    }
    
    let add = "";
    let text ="";
    if(history.location.pathname.includes("home")){
        add = (
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
            );
        text = "Your Lists"
    }

    if (store.currentList)
        text = store.currentList.name;
    return (
        <div id="top5-statusbar">
            {add}
            <Typography variant="h4" sx={{padding: 1}}>{text}</Typography>
        </div>
    );
}

export default Statusbar;