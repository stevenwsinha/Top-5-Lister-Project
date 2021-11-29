import * as React from 'react';
import { useState } from 'react';
import { TextField } from '@mui/material';

export default function CommentBox () {
    //const { comments } = props
    const [text, setText] = useState("");

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            //store.editListName(event.target.value);
        }
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    const commentCard = <div className='comment-list'> 
                            Gamer
                        </div>
    return (
        <div className='comment-box'>
            {commentCard}
            <TextField 
                variant="outlined" 
                label='Add comment' 
                fullWidth
                size="small" 
                onChange={handleUpdateText}
                onKeyPress={handleKeyPress}
                defaultValue={""}
            />
        </div>  
    );
}