import { useContext } from 'react'
//import { GlobalStoreContext } from '../store
import { HomeScreen, WorkspaceScreen, Statusbar, WorkToolbar, ListViewer } from '.';
import { Container } from '@mui/material';

export default function WorkContainer() {
    //const { store } = useContext(GlobalStoreContext);

    let workspace = <ListViewer/>;
    //if(store.editingList){
      //  workspace = <WorkspaceScreen/>
    //}

    return (
        // div used to format the container
            // either use another div or Container mui component to contain/format workspace
        <div id='work-container'>
            <WorkToolbar/>
            <div id='workspace'>
                {workspace}
            </div>
            <Statusbar />
        </div>
    );
}