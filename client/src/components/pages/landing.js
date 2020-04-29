import React, {Component} from 'react';
import hash from 'hash'
const queryString = require('querystring');
// Credentials
const clientID = '703b7c645c0f48b9bcb94a4304c6d857';
const clientSecret = '8fb0f5fbc61745e88bd27498debe9cda';


const scope = 'user-read-private';
const redirectURI = 'http://localhost:3000/'
const authURL = 'https://accounts.spotify.com/authorize?' + queryString.stringify({
    client_id: clientID,
    response_type: 'code',
    redirect_uri: redirectURI,
    scope: scope
});


class Landing extends Component {
    componentDidMount(){
        console.log(window.location.href)
        if(window.location.href.includes('code')){
            console.log('It has a code.')
        }
    }

    render() {
        return (
            <div style = {{
                height:"100vh",
                // position: 'absolute', left: '50%', top: '50%',
                // transform: 'translate(-50%, -50%)'
            }} className = 'globals'>
                <div style = {{
                    position: 'absolute', left: '50%', top: '45%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <h1 className='text header'>Let's Get Started</h1>
                    <h4 className='text' style = {{'text-align': 'center'}}> You'll need to sign into Spotify to continue</h4>
                    <a href={authURL}><button className='button-primary button-colors center'>Sign In With Spotify</button></a>
                </div>
            </div>
        );
    }
}

export default Landing;