import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { list } = props;

    function handleOpenList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }
    return (
    <ListItem
    id={list._id}
    className={'list-card'}
    key={list._id}
    sx={{ marginTop: '0px', display: 'flex', p: 1}}
    style={{
        fontSize: '12pt',
        minHeight: 90,
        maxHeight: 90,
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: 'red',
        width: '98%',
        left: '1%'
    }}
    >
        <Box sx={{ 
            p: 0, 
            flexGrow: 3,  
            height: 80,
            borderStyle: 'solid',
            borderWidth: 3,
            borderColor: 'blue',}}> 
            <Grid container direction='column' spacing={0} sx={{
                height: 78,
                borderStyle: 'solid',
                borderWidth: 3,
                borderColor: 'green',
            }}>
                <Grid item sx={{
                     height: 32,
                     borderStyle: 'solid',
                     borderWidth: 3,
                     borderColor: 'pink',
                }}>
                    first grid item
                </Grid>
                <Grid item sx={{
                     height: 20,
                     borderStyle: 'solid',
                     borderWidth: 3,
                     borderColor: 'pink',
                }}>
                    second grid item
                </Grid>
                <Grid item sx={{
                     height: 20,
                     borderStyle: 'solid',
                     borderWidth: 3,
                     borderColor: 'pink',
                }}>
                    third grid item
                </Grid>
            </Grid> 
        </Box>
        <Box sx={{ 
        p: 0, 
        flexGrow: 1,
        height: 80,
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: 'yellow',}}>
            <Box sx={{ 
            p: 0, 
            flexGrow: 1,
            height: 40,
            borderStyle: 'solid',
            borderWidth: 3,
            borderColor: 'orange',}}>
            <Grid container direction='row' spacing={0} sx={{
                  borderStyle: 'solid',
                  borderWidth: 3,
                  height: 40,
                  borderColor: 'green',
            }}>
                <Grid item xs={4} sx={{
                    borderStyle: 'solid',
                    borderWidth: 3,
                    height: 40,
                    borderColor: 'blue',
                }}>
                    First Grid Item
                </Grid>
                <Grid item xs={4} sx={{
                    borderStyle: 'solid',
                    borderWidth: 3,
                    height: 40,
                    borderColor: 'blue',
                }}>
                    Second Grid Item
                </Grid>
                <Grid item xs={4} sx={{
                    borderStyle: 'solid',
                    borderWidth: 3,
                    height: 40,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    borderColor: 'blue',
                }}>
                    Third Grid Item
                </Grid>
            </Grid>
            </Box> 
            <Box sx={{ 
            p: 0, 
            flexGrow: 1,
            height: 30,
            borderStyle: 'solid',
            borderWidth: 3,
            borderColor: 'black',}}>
                <Grid container direction='row' spacing={0} sx={{
                  borderStyle: 'solid',
                  borderWidth: 3,
                  height: 30,
                  borderColor: 'pink',
            }}>
                <Grid item xs={8} sx={{
                    borderStyle: 'solid',
                    borderWidth: 3,
                    height: 30,
                    borderColor: 'blue',
                }}>
                    First Grid Item
                </Grid>
                <Grid item xs={4} sx={{
                    borderStyle: 'solid',
                    borderWidth: 3,
                    height: 30,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    borderColor: 'blue',
                }}>
                    Second Grid Item
                </Grid>
            </Grid>
            </Box>   
        </Box>   
    </ListItem>
    );
}

export default ListCard;