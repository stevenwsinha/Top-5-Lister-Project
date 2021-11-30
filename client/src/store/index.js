import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    SET_LOADED_LISTS: "SET_LOADED_LISTS",
    SET_OPENED_LISTS: "SET_OPENED_LISTS",
    SET_SORT_TYPE: "SET_SORT_TYPE",
    SET_SEARCH_FILTER: "SET_SEARCH_FILTER",
    SAVE_LIST_BEING_EDITED: "SAVE_LIST_BEING_EDITED",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    LOAD_LIST_TO_EDITED: "LOAD_LIST_TO_EDITED",
    PUBLISH_LIST: "PUBLISH_LIST",
    SAVE_LIST: "SAVE_LIST",
    SET_LIKE_LIST: "SET_LIKE_LIST"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        loadedLists: [],
        openedLists: [],
        loadType: "",
        sortType: "recent",
        searchFilter: "",
        searchUsername: "",
        listBeingEdited: null,
        listMarkedForDeletion: null,
        newListCounter: 0,
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // SET OUR LOADED LISTS TO A NEW ARRAY OF OBJECTS
            case GlobalStoreActionType.SET_LOADED_LISTS: {
                return setStore({
                    loadedLists: payload.lists,
                    openedLists: [],
                    loadType: payload.type,
                    sortType: store.sortType,
                    searchFilter: "",
                    searchUsername: "",
                    listBeingEdited: null,
                    listMarkedForDeletion: null,
                    newListCounter: store.newListCounter,
                })
            }

             // SET OUR OPENED LISTS TO A NEW ARRAY OF OBJECTS
             case GlobalStoreActionType.SET_OPENED_LISTS: {
                return setStore({
                    loadedLists: payload.newLoadedLists,
                    openedLists: payload.openLists,
                    loadType: store.loadType,
                    sortType: store.sortType,
                    searchFilter: store.searchFilter,
                    searchUsername: store.searchUsername,
                    listBeingEdited: null,
                    listMarkedForDeletion: null,
                    newListCounter: store.newListCounter,        
                })
            }
            
            // SET WHAT OUR CURRENT SORTING METHOD IS (DO THE SORTING ELSEWHERE, THEN APPLY IT WITH SET_LOADED_LISTS)
            case GlobalStoreActionType.SET_SORT_TYPE: {
                return setStore({
                    loadedLists: store.loadedLists,
                    openedLists: store.openedLists,
                    loadType: store.loadType,
                    sortType: payload,
                    searchFilter: store.searchFilter,
                    searchUsername: store.searchUsername,
                    listBeingEdited: null,
                    listMarkedForDeletion: null,
                    newListCounter: store.newListCounter,
                })
            }

            case GlobalStoreActionType.SET_SEARCH_FILTER: {
                return setStore({
                    loadedLists: store.loadedLists,
                    openedLists: store.openedLists,
                    loadType: store.loadType,
                    sortType: store.sortType,
                    searchFilter: payload,
                    searchUsername: "",
                    listBeingEdited: null,
                    listMarkedForDeletion: null,
                    newListCounter: store.newListCounter,
                })
            }

            case GlobalStoreActionType.LOAD_USER_LISTS: {
                return setStore({
                    loadedLists: payload.lists,
                    openedLists: store.openedLists,
                    loadType: store.loadType,
                    sortType: store.sortType,
                    searchFilter: "",
                    searchUsername: payload.username,
                    listBeingEdited: null,
                    listMarkedForDeletion: null,
                    newListCounter: store.newListCounter,
                })
            }
            
            // SET_LIKE_LIST
            case GlobalStoreActionType.SET_LIKE_LIST: {
                return setStore({
                    loadedLists: payload,
                    openedLists: store.openedLists,
                    loadType: store.loadType,
                    sortType: store.sortType,
                    searchFilter: store.searchFilter,
                    searchUsername: store.searchUsername,
                    listBeingEdited: store.listBeingEdited,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    newListCounter: store.newListCounter,
                })
            }

            // LOAD_LIST_BEING_EDITED
            case GlobalStoreActionType.LOAD_LIST_TO_EDITED: {
                return setStore({
                    loadedLists: payload.loadedLists,
                    openedLists: [],
                    loadType: store.loadType,
                    sortType: "",
                    searchFilter: "",
                    searchUsername: store.searchUsername,
                    listBeingEdited: payload.list,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    newListCounter: store.newListCounter,
                })
            }

            //  SET A LIST AS BEING EDITED
            case GlobalStoreActionType.SAVE_LIST_BEING_EDITED: {
                return setStore({
                    loadedLists: store.loadedLists,
                    openedLists: store.openedLists,
                    loadType: store.loadType,
                    sortType: store.sortType,
                    searchFilter: store.searchFilter,
                    searchUsername: store.searchUsername,
                    listBeingEdited: payload,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    newListCounter: store.newListCounter,
                })
            }

            // PUBLISH THE EDITED LIST
            case GlobalStoreActionType.PUBLISH_LIST: {
                return setStore({
                    loadedLists: payload,
                    openedLists: store.openedLists,
                    loadType: store.loadType,
                    sortType: store.sortType,
                    searchFilter: "",
                    searchUsername: store.searchUsername,
                    listBeingEdited: null,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    newListCounter: store.newListCounter,
                })
            }

            // SAVE A LIST BUT DO NOT PUBLISH (DOES THE SAME THING AS PUBLISHING, BUT LIST IS NOT EDITED IN FUNC)
            case GlobalStoreActionType.SAVE_LIST: {
                return setStore({
                    loadedLists: payload,
                    openedLists: store.openedLists,
                    loadType: store.loadType,
                    sortType: store.sortType,
                    searchFilter: "",
                    searchUsername: store.searchUsername,
                    listBeingEdited: null,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    newListCounter: store.newListCounter,
                })
            }

            // CREATE A NEW LIST AND START EDITING IT
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    loadedLists: store.loadedLists,
                    openedLists: store.openedLists,
                    loadType: store.loadType,
                    sortType: store.sortType,
                    searchFilter: "",
                    searchUsername: store.searchUsername,
                    listBeingEdited: payload,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    newListCounter: store.newListCounter + 1,
                })
            }
           
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    loadedLists: store.loadedLists,
                    openedLists: store.openedLists,
                    loadType: store.loadType,
                    sortType: store.sortType,
                    searchFilter: store.searchFilter,
                    searchUsername: store.searchUsername,
                    listBeingEdited: store.listBeingEdited,
                    listMarkedForDeletion: payload,
                    newListCounter: store.newListCounter,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    loadedLists: store.loadedLists,
                    openedLists: store.openedLists,
                    loadType: store.loadType,
                    sortType: store.sortType,
                    searchFilter: store.searchFilter,
                    searchUsername: store.searchUsername,
                    listBeingEdited: store.listBeingEdited,
                    listMarkedForDeletion: null,
                    newListCounter: store.newListCounter,
                });
            }

            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled " + store.newListCounter;
        let payload = {
            name: newListName,
            items: ["?", "?", "?", "?", "?"],
            owner: auth.user.username,
            views: 0,
            likes: [],
            dislikes: [],
            comments: [],
            isPublished: false,
            created: new Date().toString(),
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: response.data.top5List
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING ITx
            let newList = response.data.top5List
            history.push("home/top5list/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // WHEN THE HOME BUTTON IS CLICKED, LOAD ALL OF THE LISTS OF THE CURRENTLY LOGGED IN USER
    store.loadHome = async function () {
        if(!auth.loggedIn){
            return
        }
        const response = await api.getLoggedInTop5Lists();
        if (response.data.success) {
            let top5lists = response.data.top5Lists;
            storeReducer({
                type: GlobalStoreActionType.SET_LOADED_LISTS,
                payload: {
                    lists: top5lists,
                    type: 'home'
                }
            });
            history.push("/home")
        }
        else {
            console.log("API FAILED TO GET THE LOGGED IN USERS LISTS");
        }
    }

    // WHEN THE ALL LISTS BUTTON IS CLICKED, LOAD ALL OF THE LISTS OF ALL USERS
    store.loadAll = async function () {
        const response = await api.getAllTop5Lists();
        if(response.data.success) {
            let top5lists = response.data.top5Lists;
            storeReducer({
                type: GlobalStoreActionType.SET_LOADED_LISTS,
                payload: {
                    lists: top5lists,
                    type: 'all'
                }
            });
            history.push("/home/all")
        }
        else {
            console.log("API FAILED TO GET ALL THE LISTS");
        }
    }
    // LOAD ALL THE LISTS MADE BY USER WITH GIVEN USERNAME
    store.loadUser = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LOADED_LISTS,
            payload: {
                lists: [],
                type: 'username'
            }
            });
        history.push("/home/user")
    }

    store.loadCommunity = async function () {
        try{
            let response = await api.getAllCommunityLists();
            if(response.data.success) {
                console.log(response.data)
                let communityLists = response.data.communityLists;
                // now we need to process the items
                // for each community list 

                for (let i = communityLists.length-1; i >= 0; i--){
                    // if it doesn't have 5 items (its been deleted essentially), remove it from the list
                    if( Object.keys(communityLists[i].items).length < 5){
                        communityLists.splice(i, 1)
                        continue;
                    }
                    //otherwise, construct an array of the top 5 elements
                    let sortedLists = Object.entries(communityLists[i].items).sort((a, b) => b[1] - a[1]);
                    let newItems = sortedLists.slice(0,5).map( (array) => {return array[0]} )
                    communityLists[i].items = newItems

                    // now, change the necessary fields to upper case
                    let nameWords = communityLists[i].name.split(" ")
                    communityLists[i].name = nameWords.map((word) => { 
                        return word[0].toUpperCase() + word.substring(1); 
                    }).join(" ");

                    for (let j = 0; j < 5; j++){
                        let itemWords = communityLists[i].items[j].split(" ")
                        communityLists[i].items[j] = itemWords.map((word) => { 
                            return word[0].toUpperCase() + word.substring(1); 
                        }).join(" ");
                    }
                }
            
                storeReducer({
                    type: GlobalStoreActionType.SET_LOADED_LISTS,
                    payload: {
                        lists: communityLists,
                        type: 'community'
                    }
                });
                history.push("/home/community")
            }
        }
        catch(err){
            console.log(err)
        }
    }

    // UPDATE THE SEARCH FILTER
    store.updateSearchFilter = function (text) {
        storeReducer({
            type: GlobalStoreActionType.SET_SEARCH_FILTER,
            payload: text,
        });
    }

    // UPDATE THE USERNAME WE ARE SEARCHING BY IN USER PAGE
    store.getUserLists = async function (username) {
        if(username === ""){
            store.loadUser()
            return
        }
        try{
            const response = await api.getTop5ListByUsername(username)
            if(response.data.success){
                storeReducer({
                    type: GlobalStoreActionType.LOAD_USER_LISTS,
                    payload: {
                        lists: response.data.top5Lists,
                        username: username,
                    }
                });
            }
        }
        catch(err){
            console.log(err)
        }
    }

    store.openList = async function (index) {
        let openLists = store.openedLists
        openLists.push(store.loadedLists[index])
        let newLoadedLists = store.loadedLists
        if(newLoadedLists[index].isPublished || store.loadType === "community"){
            newLoadedLists[index].views++
        }

        try{
            let response =""
            if(store.loadType === "community"){
                response = await api.UpdateCommunity(newLoadedLists[index]._id, newLoadedLists[index])
            }
            else{
                response = await api.updateTop5ListById(newLoadedLists[index]._id, newLoadedLists[index])
            }
            if(response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_OPENED_LISTS,
                    payload: {
                        newLoadedLists: newLoadedLists,
                        openLists: openLists
                    }
                });
            }
        }catch(err){
            console.log(err)
        }
        
    }

    store.closeList = function (index) {
        let listToClose = store.loadedLists[index]
        let openIndex = store.openedLists.indexOf(listToClose)
        let openLists = store.openedLists
        openLists.splice(openIndex, 1)
        storeReducer({
            type: GlobalStoreActionType.SET_OPENED_LISTS,
            payload: {
                newLoadedLists: store.loadedLists,
                openLists: openLists,
            }
        });
    }

    store.publishComment = async function (text, index) {
        let lists = store.loadedLists
        let newComment = {
            text: text,
            owner: auth.user.username
        }
        lists[index].comments.unshift(newComment)
        try{
            let response = "";
            if(store.loadType === "community"){
                response = await api.UpdateCommunity(lists[index]._id, lists[index])
            }
            else{
                response = await api.updateTop5ListById(lists[index]._id, lists[index])
            }
            if(response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_LIKE_LIST,
                    payload: lists
                });
            }
        }
        catch(err){
            console.log(err)
        }
    }

    store.setSortType = function (type) {
        storeReducer({
            type: GlobalStoreActionType.SET_SORT_TYPE,
            payload: type
        });
    }

    // load a list to edit based on a list id
    store.editList = function (index) {
        let top5listToEdit = store.loadedLists[index];

        let newLoadedLists = store.loadedLists
        newLoadedLists.splice(index, 1)
        storeReducer({
            type: GlobalStoreActionType.LOAD_LIST_TO_EDITED,
            payload: {
                list: top5listToEdit,
                loadedLists: newLoadedLists
            }
        });
    }

    store.toggleLike = async function (index) {
        let loadedLists = store.loadedLists
        let list = loadedLists[index]
        let innerIndex = list.likes.indexOf(auth.user.username)
        if(innerIndex > -1){
            list.likes.splice(innerIndex, 1)
        }
        else{
            list.likes.push(auth.user.username)
        }
        try{
            let response = ""
            if(store.loadType === "community"){
                response = await api.UpdateCommunity(list._id, list)
            }
            else{
                response = await api.updateTop5ListById(list._id, list)
            }
            if(response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_LIKE_LIST,
                    payload: loadedLists
                });
            }
        }
        catch(err){
            console.log(err);
        }
    }

    store.toggleDislike = async function (index) {
        let loadedLists = store.loadedLists
        let list = loadedLists[index]
        let innerIndex = list.dislikes.indexOf(auth.user.username)
        if(innerIndex > -1){
            list.dislikes.splice(innerIndex, 1)
        }
        else{
            list.dislikes.push(auth.user.username)
        }
        try{
            let response = ""
            if(store.loadType === "community"){
                response = await api.UpdateCommunity(list._id, list)
            }
            else{
                response = await api.updateTop5ListById(list._id, list)
            }
            if(response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_LIKE_LIST,
                    payload: loadedLists
                });
            }
        }
        catch(err){
            console.log(err);
        }
    }
    
    store.swapLikes = async function (index) {
        let loadedLists = store.loadedLists
        let list = loadedLists[index]
        let innerIndex = list.likes.indexOf(auth.user.username)
        if(innerIndex > -1){
            list.likes.splice(innerIndex, 1)
            list.dislikes.push(auth.user.username)
        }
        else{
            let innerIndex = list.dislikes.indexOf(auth.user.username)
            if(innerIndex > -1){
                list.dislikes.splice(innerIndex, 1)
                list.likes.push(auth.user.username)
            }
        }
        try{
            let response = ""
            if(store.loadType === "community"){
                response = await api.UpdateCommunity(list._id, list)
            }
            else{
                response = await api.updateTop5ListById(list._id, list)
            }
            if(response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_LIKE_LIST,
                    payload: loadedLists
                });
            }
        }
        catch(err){
            console.log(err);
        }
    }

    store.editListItem = async function (index, text) {
        const top5list = store.listBeingEdited
        top5list.items[index] = text
        storeReducer({
            type: GlobalStoreActionType.SAVE_LIST_BEING_EDITED,
            payload: top5list
        });
    }

    store.editListName = async function (text) {
        const top5list = store.listBeingEdited
        top5list.name = text
        storeReducer({
            type: GlobalStoreActionType.SAVE_LIST_BEING_EDITED,
            payload: top5list
        });
    }

    // save the list currently stored in listBeingEdited   
    store.saveList = async function () {
        let top5list = store.listBeingEdited
        try{
            let response = await api.updateTop5ListById(top5list._id, top5list)
            if(response.data.success) {
                let loadedLists = store.loadedLists
                loadedLists.unshift(top5list)
                storeReducer({
                    type: GlobalStoreActionType.SAVE_LIST,
                    payload: loadedLists
                });
                history.push('/home')
            }
        }
        catch(err){
            console.log(err);
        }
    }

    store.publishList = async function () {
        let top5list = store.listBeingEdited
        // compare this list's name with all other lists by this user

        let exists = false
        for(let i = 0; i < store.loadedLists.length; i++) {
            let listName = store.loadedLists[i].name
            if(store.loadedLists[i].isPublished){
                if(top5list.name.toUpperCase() === listName.toUpperCase()){
                    exists = true;
                }
            }
        }

        if(exists){
            auth.setErrorMsg("You must create a list with a unique name!");
            return
        }

        const alphaNumericRegex = /^[0-9a-zA-Z]+$/;
        if(!top5list.name[0].match(alphaNumericRegex)){
            auth.setErrorMsg("Your list name must start with an alphanumeric character!");
            return
        }

        let duplicate = false
        let emptyItem = false;
        for(let i = 0; i < 5; i++) {
            let itemToCompare = top5list.items[i]
            if (itemToCompare === ""){
                emptyItem = true;
                break;
            }
            for(let j = 0; j < 5; j++){
                if(i !== j){
                    if(itemToCompare.toUpperCase() === top5list.items[j].toUpperCase()){
                        duplicate = true
                    }
                }
            }
        }
        if(duplicate){
            auth.setErrorMsg("You must create a list with no duplicate items!");
            return
        }
        if(emptyItem){
            auth.setErrorMsg("You must create a list with no empty items!");
            return
        }

        top5list.isPublished = true;
        top5list.created = new Date().toString();

        try{
            let response = await api.updateTop5ListById(top5list._id, top5list)
            if(response.data.success) {
                let loadedLists = store.loadedLists
                loadedLists.unshift(top5list)
                storeReducer({
                    type: GlobalStoreActionType.PUBLISH_LIST,
                    payload: loadedLists
                });
                history.push('/home')

                // update the necessary community list
                try{
                    response = await api.GetCommunityList(top5list.name)
                    if (response.data.success) {
                        response = await api.UpdateCommunityItems(top5list)
                    }
                }catch(err){
                    response = await api.CreateCommunityList(top5list)
                }
            }
        }
        catch(err){
            console.log(err);
        }
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (index) {
        // GET THE LIST
        let top5List = store.loadedLists[index];
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload: top5List
        });
    }

    store.deleteList = async function (listToDelete) {
        try{
            let response = await api.deleteTop5ListById(listToDelete._id);
            if (response.data.success) {
                store.loadHome();
                storeReducer({
                    type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
                    payload: null
                });
                if(listToDelete.isPublished){
                    try{
                        response = await api.RemoveCommunityItems(listToDelete)
                        if (response.data.success) {
                            console.log("successfully removed items from community list")   
                        }
                    }
                    catch(err){
                        console.log(err)
                    }
                }
            }
        }catch(err){
            console.log(err);
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };