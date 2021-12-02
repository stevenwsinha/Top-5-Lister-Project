import * as React from 'react';
import ListItem from '@mui/material/ListItem';
//import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';

export default function CommentCard (props) {
    const { comment, index } = props;

    return (
        <ListItem
            key={index}
            sx={{ marginTop: 0, marginBottom: '8px', display: 'flex', p: 1, paddingTop: 0, overflow: 'auto'}}
            style={{
                fontSize: '12pt',
                minHeight: 80,
                maxHeight: 80,
                borderRadius: 8,
                width: '98%',
                left: '1%',
                background: '#B98EA7',
        }}>
            <Grid container direction='column' spacing={0}>
                <Grid item sx={{maxHeight: 75}} style ={{color: '#001e64'}}>
                    <Typography>{comment.owner}</Typography> 
                </Grid>
                <Grid item sx={{maxHeight: 75}}>
                    <Typography>{comment.text}</Typography> 
                </Grid>
            </Grid>
        </ListItem>
    );
}