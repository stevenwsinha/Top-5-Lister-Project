import React, { useContext } from 'react'
import { GlobalStoreContext } from '../store'
// import AuthContext from '../auth'
import ListCard from './ListCard.js'
import List from '@mui/material/List';
import ExpandedListCard from './ExpandedListCard';

export default function ListViewer() {
    const { store } = useContext(GlobalStoreContext);

    let compareFn = null;
    switch(store.sortType) {
        case "views": {
            compareFn = function(a, b) {
                if(a.views < b.views){
                    return 1
                }
                return -1;
            }
            break;
        }

        case "likes": {
            compareFn = function(a, b){
                if(a.likes.length < b.likes.length){
                    return 1
                }
                return -1;
            }
            break;
        }

        case "dislikes" : {
            compareFn = function(a, b){
                if(a.dislikes.length < b.dislikes.length){
                    return 1
                }
                return -1;
            }
            break;
        }

        case "oldest" : {
            compareFn = function(a, b){
                if(a.createdAt < b.createdAt){
                    return -1
                }
                return 1;
            }
            break;
        }

        default: {
            compareFn = function(a, b){
                if(a.createdAt < b.createdAt){
                    return 1
                }
                return -1;
            }
        }
    }

    let lists = store.loadedLists;
    lists.sort(compareFn);

    const listCard = 
            <List>
            {
                lists.map((list, index) => {
                    if(store.openedLists.includes(list)){
                        return  list.name.toUpperCase().startsWith(store.searchFilter.toUpperCase()) ? 
                        <ExpandedListCard
                            list={list}
                            index={index}
                            key={index}/> : "" 
                    }
                    else{
                        return  list.name.toUpperCase().startsWith(store.searchFilter.toUpperCase()) ? 
                                <ListCard
                                    list={list}
                                    index={index}
                                    key={index}/> : ""
                    }
                })
            }
            </List>;

    return (
        <div id="list-selector-list">
            {listCard}  
        </div>);
}