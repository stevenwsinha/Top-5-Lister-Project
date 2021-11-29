import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export default function CommentCard (props) {
    const { comment, index } = props;

    return (
        <ListItem
            key={index}
            className={'comment-card'}
            style={{
                fontSize: '12pt',
                minHeight: 50,
                maxHeight: 50,
                borderRadius: 8,
                width: '98%',
                left: '1%'
        }}>
            <Box style={{minHeight: 16, maxHeight: 16}}> 
                <Typography>{comment.owner}</Typography> 
            </Box>
            <Box style={{minHeight: 34, maxHeight: 34}}> 
                <Typography>{comment.text}</Typography> 
            </Box>
        </ListItem>
    );
}