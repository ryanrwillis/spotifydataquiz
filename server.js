const express = require('express');
const request = require('request')
const queryString = require('querystring');
const ru = require('./helpers/randomUnique');
const keys = require('config')

const app = express();

const port = process.env.PORT || 5000;
const clientID = process.env.CLIENT_ID || keys.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET || keys.CLIENT_SECRET;
const redirectURI = keys.REDIRECT_URI;
const accountsURL = 'https://accounts.spotify.com/api';
const apiURL = 'https://api.spotify.com/v1';

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// Get an access token to use the spotify web-api using our credentials (found in config)
app.get('/get-access-token', (req, res) => {
    var authOptions = {
        url: `${accountsURL}/token`,
        form: {
            code: req.headers['code'],
            redirect_uri: redirectURI,
            grant_type: 'authorization_code',
            client_id: clientID,
            client_secret: clientSecret
        },
        json: true
    };
    request.post(authOptions, (error, response, body) =>{
        if(body.hasOwnProperty('error')){
            res.json({
                'error': body.error,
                'access_token': 'err'
            })
        } else {
            res.json({
                'access_token': body.access_token
            })
        }
    })
})

app.get('/get-user-profile', (req, res) =>{
    const options = {
        url: `${apiURL}/me`,
        headers:{
            Authorization: `Bearer ${req.headers['token']}`
        }
    }
    try {
        request.get(options, (error, response, body) => {
            body = JSON.parse(body)
            if(!body.hasOwnProperty('error')) {
                res.json({
                    name: body['display_name'],
                    image: 'foo'
                })
             } else{
                console.log('sending error code')
                res.json({error: body.error})
            }
        })
    } catch(err){
    }
})

app.get('/generate-question-set', (req, res) => {
    // Takes in 2 headers, length and token. Generates the amount of requested questions and returns complete JSON structure for the questions.
    const token = req.headers['token'];
    const length = req.headers['length']

    const topTracksOptions = {
        url: `${apiURL}/me/top/tracks?${queryString.stringify({limit: 50})}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    request.get(topTracksOptions, (error, response, body) =>{
        body = JSON.parse(body);
        let songs = body.items;
        let pairings =  ru.generatePairs(length, 0, 50);
        pairings.forEach(pair =>{
            for(let i = 0; i < 2; i++){
                songs[pair[i]].rank = pair[i];
                pair[i] = songs[pair[i]]
            }
        })
        res.json(pairings)
    })

})

// Plays a song with an ID found in the json body
app.get('/play-song', (req, res)=>{
    const token = req.headers['token'];
    const uri = req.headers['uri']

    const playOptions = {
        url: `${apiURL}/me/player/play`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        json:{
            uris: [uri]
        }
    }
    request.put(playOptions, (error, response, body) =>{
    }).then(res.send(200))
})

// Pauses a users song
app.get('/pause-song', (req, res)=>{
    const token = req.headers['token'];
    const pauseOptions = {
        url: `${apiURL}/me/player/pause`,
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
    request.put(pauseOptions, (error, response, body) =>{
    })
})