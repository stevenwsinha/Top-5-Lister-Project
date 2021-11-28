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
    SET_LIST_BEING_EDITED: "SET_LIST_BEING_EDITED",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    PUBLISH_LIST: "PUBLISH_LIST"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        loadedLists: [],
        openedLists: [],
        sortType: null,
        listBeingEdited: null,
        listMarkedForDeletion: null,
        newListCounter: 0,
        listNameActive: false,
        itemActive: false,
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
                    sortType: payload.type,
                    listBeingEdited: store.listBeingEdited,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    itemActive: store.itemActive
                })
            }

             // SET OUR OPENED LISTS TO A NEW ARRAY OF OBJECTS
             case GlobalStoreActionType.SET_OPENED_LISTS: {
                return setStore({
                    loadedLists: store.loadedLists,
                    openedLists: payload,
                    sortType: store.sortType,
                    listBeingEdited: store.listBeingEdited,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    itemActive: store.itemActive
                })
            }
            
            // SET WHAT OUR CURRENT SORTING METHOD IS (DO THE SORTING ELSEWHERE, THEN APPLY IT WITH SET_LOADED_LISTS)
            case GlobalStoreActionType.SET_SORT_TYPE: {
                return setStore({
                    loadedLists: store.loadedLists,
                    openedLists: store.openedLists,
                    sortType: payload,
                    listBeingEdited: store.listBeingEdited,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    itemActive: store.itemActive
                })
            }
            //  SET A LIST AS BEING EDITED
            case GlobalStoreActionType.SET_LIST_BEING_EDITED: {
                return setStore({
                    loadedLists: store.loadedLists,
                    openedLists: store.openedLists,
                    sortType: store.sortType,
                    listBeingEdited: payload,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    itemActive: store.itemActive
                })
            }

            // CLEAR THE EDITED LIST
            case GlobalStoreActionType.PUBLISH_LIST: {
                return setStore({
                    loadedLists: payload,
                    openedLists: store.openedLists,
                    sortType: store.sortType,
                    listBeingEdited: null,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    itemActive: store.itemActive
                })
            }

            // CREATE A NEW LIST AND START EDITING IT
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    loadedLists: store.loadedLists,
                    openedLists: store.openedLists,
                    sortType: store.sortType,
                    listBeingEdited: payload,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: store.listNameActive,
                    itemActive: store.itemActive
                })
            }
           
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    loadedLists: store.loadedLists,
                    openedLists: store.openedLists,
                    sortType: store.sortType,
                    listBeingEdited: store.listBeingEdited,
                    listMarkedForDeletion: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    itemActive: store.itemActive
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    loadedLists: store.loadedLists,
                    openedLists: store.openedLists,
                    sortType: store.sortType,
                    listBeingEdited: store.listBeingEdited,
                    listMarkedForDeletion: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    itemActive: store.itemActive
                });
            }
          
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    loadedLists: store.loadedLists,
                    openedLists: store.openedLists,
                    sortType: store.sortType,
                    listBeingEdited: store.listBeingEdited,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    itemActive: true
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    loadedLists: store.loadedLists,
                    openedLists: store.openedLists,
                    sortType: store.sortType,
                    listBeingEdited: store.listBeingEdited,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    itemActive: true
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

    // THIS FUNCTION LOADS ALL LISTS OF THE CURRENTLY LOGGED IN USER
    store.loadLoggedInLists = async function () {
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
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    // LOAD ALL THE LISTS MADE BY USER WITH GIVEN USERNAME
    store.loadListsByUsername = async function (username) {
        const response = await api.getTop5ListByUsername(username)
        if(response.data.success) {
            let top5lists = response.data.top5lists;
            storeReducer({
                type: GlobalStoreActionType.SET_LOADED_LISTS,
                payload: {
                    lists: top5lists,
                    type: 'username'
                }
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    // LOAD ALL LISTS MADE BY ALL USERS
    store.loadAllLists = async function () {
        const response = await api.getAllTop5Lists()
        if(response.data.success){
            let top5lists = response.data.top5lists;
            storeReducer({
                type: GlobalStoreActionType.SET_LOADED_LISTS,
                payload: {
                    lists: top5lists,
                    type: 'all'
                }
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    // load a list to edit based on a list id
    store.editList = async function (id) {
        const response = await api.getTop5ListById(id)
        if(response.data.success) {
            //let top5list = response.data.top5list
            return 0;
        }
        else{
            console.log("API FAILED TO GET LIST BY ID")
        }
    }

    store.editListItem = async function (index, text) {
        const top5list = store.listBeingEdited
        top5list.items[index] = text
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_BEING_EDITED,
            payload: top5list
        });
    }

    // save the list currently stored in listBeingEdited   
    store.saveList = async function () {
       // let top5list = store.listBeingEdited
        return 0;
    }

    store.publishList = async function () {
        let top5list = store.listBeingEdited
        // compare this list's name with all other lists by this user
        // should already have all lists by this user loaded, but if not, load them
        if(store.filterType !== 'home'){
            store.loadLoggedInLists()
        }

        let exists = false
        for(let i; i < store.loadedLists.length; i++) {
            let listName = store.loadedLists[i].name
            if(top5list.name === listName){
                exists = true;
            }
        }

        if(exists){
            auth.setErrorMsg("You must create a list with a unique name!");
            return
        }

        top5list.isPublished = true;

        try{
            let response = await api.updateTop5ListById(top5list._id, top5list)
            if(response.data.success) {
                let loadedLists = store.loadedLists
                loadedLists.push(top5list)
                storeReducer({
                    type: GlobalStoreActionType.PUBLISH_LIST,
                    payload: loadedLists
                });
                history.push('/home')
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
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        try{
            let response = await api.getTop5ListById(id);
            if (response.data.success) {
                let top5List = response.data.top5List;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: top5List
                });
            }
        }catch(err){
            console.log(err);
        }
    }

    store.deleteList = async function (listToDelete) {
        try{
            let response = await api.deleteTop5ListById(listToDelete._id);
            if (response.data.success) {
                store.loadIdNamePairs();
                history.push("/");
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

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
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