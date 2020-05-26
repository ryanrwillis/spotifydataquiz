import React, {Component} from 'react';
const keys = require('config')
import hash from 'hash'
const queryString = require('querystring');
// Credentials
const clientID = keys.CLIENT_ID;



const scope = 'user-read-private user-top-read streaming user-modify-playback-state';
const redirectURI = keys.REDIRECT_URI;
const authURL = 'https://accounts.spotify.com/authorize?' + queryString.stringify({
    client_id: clientID,
    response_type: 'code',
    redirect_uri: redirectURI,
    scope: scope,
    show_dialog: 'true'
});


class Landing extends Component {
    componentDidMount(){
        const params = queryString.parse(window.location.href.split('/?')[1]);
        if(params.hasOwnProperty('code')){
            this.props.callback({
                code: params['code'],
                index: 'start-quiz'
            })
        }
    }

    render() {
        return (
            <div style = {{
                height:"100vh",
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