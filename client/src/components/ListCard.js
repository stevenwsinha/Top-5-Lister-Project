import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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

    let listClass = 'draft-card';
    let publishComponent = <Button variant="text" sx={{fontSize: '10pt', p:0}} style={{color: '#C70039'}}>Edit</Button>
    if(list.isPublished) {
        listClass = 'list-card'
        publishComponent = <Typography sx={{fontSize: '10pt'}} style={{color: '#086108'}}> Published: {list.timestamp} </Typography>
    }

    return (
    <ListItem
    id={list._id}
    className={listClass}
    key={list._id}
    sx={{ marginTop: '0px', marginBottom: '10px', display: 'flex', p: 1}}
    style={{
        fontSize: '12pt',
        minHeight: 90,
        maxHeight: 90,
        width: '98%',
        left: '1%'
    }}
    >
        <Box sx={{ 
            p: 0, 
            flexGrow: 3,  
            height: 80,}}> 
            <Grid container direction='column' spacing={0} sx={{height: 78,}}>
                <Grid item sx={{height: 34}}>
                    <Typography variant='h5'style={{color: 'black'}}> {list.name} </Typography>
                </Grid>
                <Grid item sx={{height: 24}}>
                    <Typography sx={{fontSize: '10pt'}} style={{color: '#001e64'}}> By: {list.owner} </Typography>
                </Grid>
                <Grid item sx={{height: 20,}}>
                    {publishComponent}
                </Grid>
            </Grid> 
        </Box>
        <Box sx={{ 
        p: 0, 
        flexGrow: 1,
        height: 80}}>
            <Box sx={{ 
            p: 0, 
            flexGrow: 1,
            height: 50,}}>
            <Grid container direction='row' spacing={0} sx={{height: 50}}>
                <Grid item xs={4} sx={{height: 50}}>
                    <IconButton
                        size="medium"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <ThumbUpOutlinedIcon />
                    </IconButton>
                    {list.likes.length}
                </Grid>
                <Grid item xs={4} sx={{ height: 50 }}>
                    <IconButton
                        size="medium"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <ThumbDownOutlinedIcon />
                    </IconButton>
                    {list.dislikes.length}
                </Grid>
                <Grid item xs={4} sx={{height: 50, display: 'flex', justifyContent: 'flex-end', }}>
                    <IconButton
                        size="medium"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <DeleteOutlinedIcon />
                    </IconButton>
                </Grid>
            </Grid>
            </Box> 
            <Box sx={{ 
                p: 0, 
                flexGrow: 1,
                height: 30,}}>
                <Grid container direction='row' spacing={0} sx={{height: 30}}>
                <Grid item xs={8} sx={{height: 30}}>
                    <Typography style={{color: '#C70039'}}> Views: {list.views} </Typography>
                </Grid>
                <Grid item xs={4} sx={{ height: 30, display: 'flex', justifyContent: 'flex-end'}}>
                    <IconButton
                        size="medium"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </Grid>
            </Grid>
            </Box>   
        </Box>   
    </ListItem>
    );
}

export default ListCard;