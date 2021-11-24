import React from 'react'
import { useHistory } from 'react-router-dom'

export default function WelcomeScreen() {
    const history = useHistory();

    // SEND A USER TO REGISTER SCREEN
    function handleRegister() {
        history.push("/register")
    }

    // SEND A USER TO LOGIN SCREEN
    function handelLogin(){
        history.push("/login")
    }

    // SEND A USER TO HOME SCREEN LOGGED IN AS GUEST
    function handleGuest(){
        history.push("/home")
    }

    // return full screen with background, welcome text, copyright component, and 3 buttons
    // color and size of text should be set fine, but need to configure positioning
    return(
        <div id ='welcome-screen'> 
            <div>
                <span className='welcome' id='welcome-text'> Welcome </span> <br></br>
                <span className='welcome' id ='welcome-description'> Top 5 Lister is a premier Top 5 List creator and community manager </span>
                <button className='welcome-button' id='welcome-register' onClick={handleRegister}> Register </button>
                <button className='welcome-button' id='welcome-login' onClick={handelLogin}> Login </button>
                <button className='welcome-button' id='welcome-guest' onClick={handleGuest}> Continue as Guest </button>
            </div> 
        </div>
    );
}