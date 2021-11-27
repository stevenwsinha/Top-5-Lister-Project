import { useContext } from 'react'
//import { GlobalStoreContext } from '../store
import { HomeScreen, WorkspaceScreen, Statusbar, WorkToolbar, ListViewer } from '.';


export default function WorkContainer() {
    //const { store } = useContext(GlobalStoreContext);

    let workspace = <WorkspaceScreen/>;
    //if(store.editingList){
      //  workspace = <WorkspaceScreen/>
    //}

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