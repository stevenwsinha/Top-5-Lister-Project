import * as React from 'react';
import { useState } from 'react';
import { List } from '@mui/material';
import { CommentCard } from '.';

export default function CommentBox (props) {
    const { comments } = props;

    let commentCards =  <List >
                        {
                            comments.map((comment, index) => {
                                return <CommentCard 
                                            comment={comment}
                                            key={index}
                                        />
                            })
                        }
                        </List>;
    return (
        <div className='comment-card-list'>
            {commentCards}
        </div>
    );
}