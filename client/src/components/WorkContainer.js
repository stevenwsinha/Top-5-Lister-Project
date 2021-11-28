import { useContext } from 'react'
import { useEffect } from 'react';
import { GlobalStoreContext } from '../store'
import { WorkspaceScreen, Statusbar, WorkToolbar, ListViewer } from '.';
import AuthContext from '../auth'

export default function WorkContainer() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    
    useEffect(() => {
        auth.getLoggedIn();

        // we need to reload lists based on path in history
    }, []);

    let workspace = <ListViewer/>;
    if(store.listBeingEdited){
        workspace = <WorkspaceScreen/>
    }

    return (
        <div id='work-container'>
            <WorkToolbar/>
            <div id='workspace'>
                {workspace}
            </div>
            <Statusbar />
        </div>
    );
}