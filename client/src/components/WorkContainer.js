import { useContext } from 'react'
import { HomeScreen, WorkspaceScreen, Statusbar, WorkToolbar } from '.';

export default function WorkContainer() {
    //const { store } = useContext(GlobalStoreContext);

    let workspace = <HomeScreen/>;
   // if(store.editingList){
     //   workspace = <WorkspaceScreen/>
   // }

    return (
        <div id='work-container'>
            <WorkToolbar/>
            {workspace}
            <Statusbar />
        </div>
    );
}