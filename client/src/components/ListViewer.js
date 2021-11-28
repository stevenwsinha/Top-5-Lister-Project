import React, { useContext } from 'react'
import { GlobalStoreContext } from '../store'
// import AuthContext from '../auth'
import ListCard from './ListCard.js'
import List from '@mui/material/List';

export default function ListViewer() {
    const { store } = useContext(GlobalStoreContext);

    const listCard = 
            <List>
            {
                store.loadedLists.map((list, index) => (
                    <ListCard
                        list={list}
                        index={index}
                        key={index}
                    />
                ))
            }
            </List>;

    return (
        <div id="list-selector-list">
            {listCard}  
        </div>);
}