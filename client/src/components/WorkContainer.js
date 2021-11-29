import { useContext } from 'react'
import { useEffect } from 'react';
import { GlobalStoreContext } from '../store'
import { WorkspaceScreen, Statusbar, WorkToolbar, ListViewer, DeleteModal } from '.';
import AuthContext from '../auth'

export default function WorkContainer() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    let workspace = <ListViewer/>;
    if(store.listBeingEdited){
        workspace = <WorkspaceScreen/>
    }

    return (
        <div id='work-container'>
            <DeleteModal/>
            <WorkToolbar/>
            <div id='workspace'>
                {workspace}
            </div>
            <Statusbar />
        </div>
    );
}