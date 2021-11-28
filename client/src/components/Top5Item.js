import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';

/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    let { index } = props;

    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState(store.listBeingEdited.items[index]);

    function handleClick (event) {
        if (event.detail === 1) {
            return;
        }
        else if (event.detail === 2) {
            handleToggleEdit(event);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemEditActive();
        }
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let index = event.target.id
            index = index.substring("item-")
            console.log(index.substring("item"))
            store.editListItem(index, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }


    let itemClass = "top5-item";
    let itemElement = <ListItem
                            id={'item-' + (index)}
                            key={props.key}
                            className={itemClass}
                            onClick={handleClick}
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
                            margin='normal'
                            required
                            fullWidth
                            id={"item-" + index}
                            label="Top 5 List Item"
                            name="name"
                            autoComplete="Top 5 List Item"
                            className='top5-item'
                            onChange={handleUpdateText}
                            onKeyPress={handleKeyPress}
                            defaultValue={store.listBeingEdited.items[index]}
                            inputProps={{style: {fontSize: 48}}}
                            InputLabelProps={{style: {fontSize: 24}}}
                            autoFocus
                        />
    }
    return itemElement;
}

export default Top5Item;