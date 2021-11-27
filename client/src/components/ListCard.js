import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
        id={'list-item-test'}
        key={list._id}
        sx={{ marginTop: '15px', display: 'flex', p: 1, overflow: 'hidden', }}
        style={{
            width: '100%'
        }}
    >
        <Grid container spacing={2}>
            <Grid item container xs={8}>
                <Grid item xs={12}>
                    {list.name}
                </Grid>
                <Grid item xs={12}>
                    {list.owner}
                </Grid>
                <Grid item xs={12}>
                    {list.isPublished}
                </Grid>
            </Grid>
            <Grid item container xs={4}>
                <Grid item xs={2}>
                    Like Button
                </Grid>
                <Grid item xs={2}>
                    {list.likes.length}
                </Grid>
                <Grid item xs={2}>
                    Dislike Button
                </Grid>
                <Grid item xs={2}>
                    {list.dislikes.length}
                </Grid>
                <Grid item xs={4}>
                    Delete Button
                </Grid>
                <Grid item xs={8}>
                    Views: {list.views}
                </Grid>
                <Grid item xs={4}>
                    Open Button
                </Grid>
            </Grid>
        </Grid>
    </ListItem>
    );
}

export default ListCard;