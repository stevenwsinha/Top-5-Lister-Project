import { useContext, useState } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import ErrorModal from './ErrorModal.js';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
//import AuthContext from '../auth'
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState(store.listBeingEdited.name);

    function handleSave() {
        store.editListName(text);
        store.saveList();
    }

    function handlePublish() {
        store.editListName(text);
        store.publishList();
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.editListName(event.target.value.trim());
        }
    }

    function handleBlur(event) {
        store.editListName(event.target.value.trim());
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    const listToEdit = store.listBeingEdited;
    let  editItems = 
        <List id="edit-items" sx={{ width: '100%',}}>
            {
                listToEdit.items.map((item, index) => (
                    <Top5Item 
                        text={item}
                        index={index} 
                        key={index}
                    />
                ))
            }
        </List>;

    return (
        <div id="edit-area">
           <ErrorModal />
           <Grid container direction='column' spacing={0}>
                <Grid item xs={1} sx={{p:0, m: 0}}>
                    <TextField 
                        variant="outlined" 
                        label='List Name' 
                        size="small" 
                        onChange={handleUpdateText}
                        onKeyPress={handleKeyPress}
                        onBlur={handleBlur}
                        defaultValue={store.listBeingEdited.name}
                        />
                </Grid>

                <Grid item xs={10} sx={{p:2, m: 0,}}>
                <div id="top5-workspace">
                    <div id="workspace-edit">
                        <div id="edit-numbering">
                            <div className="item-number"><Typography variant="h3">1.</Typography></div>
                            <div className="item-number"><Typography variant="h3">2.</Typography></div>
                            <div className="item-number"><Typography variant="h3">3.</Typography></div>
                            <div className="item-number"><Typography variant="h3">4.</Typography></div>
                            <div className="item-number"><Typography variant="h3">5.</Typography></div>
                        </div>
                        {editItems}
                    </div>
                </div>
                </Grid>

                <Grid item xs={1} sx={{p:0, m: 0, display: 'flex', justifyContent: 'flex-end'}}>
                   <Box> 
                       <Button variant="text" sx={{fontSize: '12pt', p:1, marginLeft: 1}} style={{background: '#001e64', color: 'white'}} onClick={handleSave}>Save</Button>  
                       <Button variant="text" sx={{fontSize: '12pt', p:1, marginLeft: 1}} style={{background: '#001e64', color: 'white'}} onClick={handlePublish}>Publish</Button>       
                   </Box>
                </Grid>
           </Grid>
        </div>
    )
}

export default WorkspaceScreen;