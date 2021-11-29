import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useState } from 'react';
import AuthContext from '../auth'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { CommentBox, ItemView } from '.';
import Grid from '@mui/material/Grid';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ExpandedListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { list, index } = props;
    const { auth } = useContext(AuthContext);
    const [text, setText] = useState("");

    async function handleDeleteList(event) {
        event.stopPropagation();
        store.markListForDeletion(getIndex(list._id));
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            setText("")
            store.publishComment(event.target.value, getIndex(list._id));
        }
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function getIndex (id) {
        for(let i = 0; i < store.loadedLists.length; i++){
            if(store.loadedLists[i]._id === id){
                return i;
            }
        }
        return 0;
    }

    function handleCloseList() {
        store.closeList(getIndex(list._id))
    }

    function handleEditList() {
        store.editList(getIndex(list._id))
    }

    function toggleLike() {
        if(!auth.loggedIn) {
            auth.setErrorMsg("Log in to like a list")
            return
        }

        if(!list.isPublished && store.loadType !== "community"){
            return
        }
        if(list.dislikes.includes(auth.user.username)){
            store.swapLikes(getIndex(list._id))
        }
        else{
            store.toggleLike(getIndex(list._id))
        }
    }

    function toggleDislike() {
        if(!auth.loggedIn) {
            auth.setErrorMsg("Log in to dislike a list")
            return
        }

        if(!list.isPublished && store.loadType !== "community"){
            return
        }
        if(list.likes.includes(auth.user.username)){
            store.swapLikes(getIndex(list._id))
        }
        else{
            store.toggleDislike(getIndex(list._id), "dislike")
        }
    }


    let listClass = 'draft-card';
    let publishComponent = <Button variant="text" sx={{fontSize: '10pt', p:0}} style={{color: '#C70039'}} onClick={handleEditList}>Edit</Button>
    if(list.isPublished) {
        listClass = 'list-card'
        publishComponent = <Typography sx={{fontSize: '10pt'}} style={{color: '#086108'}}> Published: {list.created.substring(4, 15)} </Typography>
    }

    let ownerText = <Typography sx={{fontSize: '10pt'}} style={{color: '#001e64'}}> By: {list.owner} </Typography>
    if(store.loadType === 'community'){
        listClass = 'list-card'
        publishComponent = <Typography sx={{fontSize: '10pt'}} style={{color: '#086108'}}> Updated: {list.updated.substring(4, 15)} </Typography>
        ownerText = <Typography sx={{fontSize: '10pt'}} style={{color: '#001e64'}}> Community List </Typography>
    }

    let likeButton =    <IconButton
                            size="medium"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleLike}
                        >
                            <ThumbUpOutlinedIcon />
                        </IconButton>;

    if(auth.loggedIn){
        if(list.likes.includes(auth.user.username)){
            likeButton =    <IconButton
                                size="medium"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleLike}
                            >
                                <ThumbUpIcon />
                            </IconButton>;
        }
    }

    let dislikeButton = <IconButton
                            size="medium"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDislike}
                        >
                            <ThumbDownOutlinedIcon />
                        </IconButton>

    if(auth.loggedIn){
        if(list.dislikes.includes(auth.user.username)){
            dislikeButton =    <IconButton
                                size="medium"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDislike}
                            >
                                <ThumbDownIcon />
                            </IconButton>;
        }   
    }

    let deleteButton = ""
    if(store.loadType === 'home'){
        deleteButton = <IconButton
                        size="medium"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDeleteList}
                        >
                            <DeleteOutlinedIcon />
                        </IconButton>
    }

    return (
    <ListItem
    id={'list-item-' + index}
    className={listClass}
    key={index}
    sx={{ marginTop: '0px', marginBottom: '10px', display: 'flex', p: 1}}
    style={{
        fontSize: '12pt',
        minHeight: 400,
        maxHeight: 400,
        width: '98%',
        left: '1%'
    }}
    >   
        <Box style={{
        fontSize: '12pt',
        minHeight: 395,
        maxHeight: 395,
        width: '50%',
        }}>
            <Box style={{
            fontSize: '12pt',
            minHeight: 60,
            maxHeight: 60,
            width: '100%',
            }}>
                <Typography variant='h5'style={{color: 'black'}}> {list.name} </Typography>
                {ownerText}
            </Box>
            
            <Box style={{
            fontSize: '12pt',
            minHeight: 300,
            maxHeight: 300,
            width: '100%',
            borderStyle: 'solid',
            borderWidth: 2,
            borderColor: 'green'
            }}>
                <ItemView
                    list={list} />
            </Box>  

            <Box style={{
            fontSize: '12pt',
            minHeight: 25,
            maxHeight: 25,
            width: '100%',
            }}>
                {publishComponent}
            </Box>    
        </Box>
        <Box style={{
        fontSize: '12pt',
        minHeight: 395,
        maxHeight: 395,
        width: '50%',
        }}>
            <Box style={{
            fontSize: '12pt',
            minHeight: 60,
            maxHeight: 60,
            width: '100%',
            }}>
                <Grid container direction='row' spacing={0} sx={{height: 50}}>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={3} sx={{height: 50}}>
                    {likeButton}
                    {list.likes.length}
                </Grid>
                <Grid item xs={3} sx={{ height: 50 }}>
                    {dislikeButton}
                    {list.dislikes.length}
                </Grid>
                <Grid item xs={2} sx={{height: 50, display: 'flex', justifyContent: 'flex-end', }}>
                    {deleteButton}
                </Grid>
            </Grid>
            </Box>

            <Box style={{
            fontSize: '12pt',
            minHeight: 300,
            maxHeight: 300,
            width: '100%',
            }}>
                <Grid container direction='column' spacing={0} sx={{width: 1}}>
                    <Grid item sx={{minHeight: 265, maxHeight: 265}}>
                        <CommentBox comments={list.comments}/>
                    </Grid>
                    <Grid item>
                        <TextField 
                            variant="outlined" 
                            label='Add comment' 
                            fullWidth
                            size="small" 
                            onChange={handleUpdateText}
                            onKeyPress={handleKeyPress}
                            value={text}
                            defaultValue={""}
                        />
                    </Grid>
                </Grid>
            </Box>  

            <Box style={{
            fontSize: '12pt',
            minHeight: 25,
            maxHeight: 25,
            width: '100%',
            }}>
                <Grid container direction='row' spacing={0} sx={{height: 25}}>
                    <Grid item xs={4}>
                    </Grid>

                    <Grid item xs={6} sx={{height: 50}}>
                        <Typography style={{color: '#C70039'}}> Views: {list.views} </Typography>
                    </Grid>

                    <Grid item xs={2} sx={{height: 50, display: 'flex', justifyContent: 'flex-end', }}>
                        <IconButton
                            size="medium"
                            color="inherit"
                            onClick={handleCloseList}
                            aria-label="open drawer"
                        >
                            <ExpandLessIcon />
                        </IconButton>
                    </Grid>

                </Grid>
            </Box>    
        </Box>

    </ListItem>
    );
}

export default ExpandedListCard;