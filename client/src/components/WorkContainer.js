import { useContext } from 'react'
import { useEffect } from 'react';
import { GlobalStoreContext } from '../store'
import { WorkspaceScreen, Statusbar, WorkToolbar, ListViewer, DeleteModal, ErrorModal } from '.';
import AuthContext from '../auth'

export default function WorkContainer() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        async function fetchLoggedIn() {
            let response = await auth.getLoggedIn();

            if(response){
                store.loadHome()
            }
            else{
                store.loadCommunity()
            }
        }
        fetchLoggedIn();
    }, []);

    let workspace = <ListViewer/>;
    if(store.listBeingEdited){
        workspace = <WorkspaceScreen/>
    }

    return (
        <div id='work-container'>
            <ErrorModal/>
            <DeleteModal/>
            <WorkToolbar/>
            <div id='workspace'>
                {workspace}
            </div>
            <Statusbar />
        </div>
    );
}