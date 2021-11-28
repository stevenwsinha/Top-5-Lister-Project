import { useContext } from 'react'
import { useEffect } from 'react';
import { GlobalStoreContext } from '../store'
import { WorkspaceScreen, Statusbar, WorkToolbar, ListViewer } from '.';


export default function WorkContainer() {
    const { store } = useContext(GlobalStoreContext);

    // useEffect()

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