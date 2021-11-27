import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    let { index } = props;

    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    // const [text, setText] = useState(store.currentList.items[index]);
    const [draggedTo, setDraggedTo] = useState(0);

    function handleDragStart(event, targetId) {
        event.dataTransfer.setData("item", targetId);
    }

    function handleDragOver(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragEnter(event) {
        event.preventDefault();
        console.log("entering");
    }

    function handleDragLeave(event) {
        event.preventDefault();
        console.log("leaving");
        setDraggedTo(false);
    }

    function handleDrop(event, targetId) {
        event.preventDefault();
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        console.log("handleDrop (sourceId, targetId): ( " + sourceId + ", " + targetId + ")");

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        //setText(store.currentList.items[index]);
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemEditActive();
        }
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            //store.addUpdateItemTransaction(index, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        //setText(event.target.value);
    }


    let itemClass = "top5-item";
    let itemElement = <ListItem
                            id={'item-' + (index+1)}
                            key={props.key}
                            className={itemClass}
                            sx={{ display: 'flex', p: 1 }}
                            style={{
                                fontSize: '36pt',
                                width: '100%'
                            }}
                        >
                            <Box sx={{ p: 1, flexGrow: 1 }}>{props.text}</Box>
                        </ListItem>

    if(editActive){
        itemElement = <TextField
                            margin="auto"
                            required
                            fullWidth
                            id={"item-" + index}
                            label="Top 5 List Item"
                            name="name"
                            autoComplete="Top 5 List Item"
                            className='top5-item'
                            inputProps={{style: {fontSize: 48}}}
                            InputLabelProps={{style: {fontSize: 24}}}
                            autoFocus
                        />
    }
    return itemElement;
}

export default Top5Item;