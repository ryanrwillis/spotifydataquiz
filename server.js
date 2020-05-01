const express = require('express');
const request = require('request')
const queryString = require('querystring');
const ru = require('./helpers/randomUnique')

const app = express();

const port = process.env.PORT || 5000;
const clientID = process.env.CLIENT_ID || '703b7c645c0f48b9bcb94a4304c6d857'; // git ignore
const clientSecret = process.env.CLIENT_SECRET || '8fb0f5fbc61745e88bd27498debe9cda'; // git ignore
const redirectURI = 'http://localhost:3000/';
const accountsURL = 'https://accounts.spotify.com/api';
const apiURL = 'https://api.spotify.com/v1'

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

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
        res.json({
            'access_token': body.access_token
        })
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
            console.log('sending response')
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
        console.log(err)
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

app.get('/play-song', (req, res)=>{
    const token = req.headers['token'];
    const uri = req.headers['uri']
    console.log('playing ', uri)

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
      console.log(body)
    }).then(res.send(200))
})