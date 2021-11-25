import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import {
    WelcomeScreen,
    AppBanner,
    HomeWrapper,
    RegisterScreen,
    Statusbar,
    WorkspaceScreen,
    LoginScreen,
} from './components'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#143278',
    },
    secondary: {
      main: '#781423',
    },
  },
});


/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/
const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <AuthContextProvider>
                    <GlobalStoreContextProvider>              
                        <Switch>
                            <Route path="/" exact component={WelcomeScreen} />
                            <Route path='/register' exact component={RegisterScreen} />
                            <Route path='/login' exact component={LoginScreen} />
                            <Route path='/home' exact component={WorkspaceScreen} />
                        </Switch>
                    </GlobalStoreContextProvider>
                </AuthContextProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App