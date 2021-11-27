import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import {
    WelcomeScreen,
    AppBanner,
    RegisterScreen,
    LoginScreen,
    WorkContainer
} from './components'


/*
    CREATE A THEME WITH A COLOR PALETTE FOR ALL MUI COMPONENTS IN OUR APP
*/
const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#001e64',
    },
    secondary: {
      main: '#96b4fa',
    },
    text: {
      secondary: "#ffff"
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
                        <AppBanner/>
                        <Switch>
                            <Route path="/" exact component={WelcomeScreen} />
                            <Route path='/register' exact component={RegisterScreen} />
                            <Route path='/login' exact component={LoginScreen} />
                            <Route path='/home' exact component={WorkContainer} />
                        </Switch>
                    </GlobalStoreContextProvider>
                </AuthContextProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App