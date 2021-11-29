import { useContext } from 'react'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
import { WorkspaceScreen, Statusbar, WorkToolbar, ListViewer, DeleteModal } from '.';
import AuthContext from '../auth'
import Home from '@mui/icons-material/Home';

export default function WorkContainer() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const history = useHistory();

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