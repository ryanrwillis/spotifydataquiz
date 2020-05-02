import React, {Component} from 'react';
import  {withStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
const axios = require('axios');

// I have taken this slider styling from https://material-ui.com/components/slider/. None of the below styling is my own.
const GreenSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
        fontSize: '80%'
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

class StartPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            name: '',
            slider: 10,
        }
    }

    handleSliderChange = (event, value) =>{
        this.setState({
            slider: value
        })
    }

    getQuestions = () =>{ //generate-question-set
        axios({
            method: 'get',
            url: '/generate-question-set',
            headers: {
                token: this.state.token,
                length: this.state.slider
            }
        }).then(res =>{
            console.log(res.data)
            this.props.callback({questions: res.data, index: 'game', token: this.state.token})
        })
    }

    handlePlayButton = event =>{
        event.preventDefault();
        this.getQuestions(); // Adds questions to the outer frame's state for use in game portion
    }

    getAccessToken = () =>{
        axios({
            method: 'get',
            url: '/get-access-token',
            headers: {
                code: this.props.code
            }
        }).then( res =>{
            this.setState({
                token: res.data['access_token']
            })
        }).then( ()=>{ // Get profile info
            axios({
                method: 'get',
                url: '/get-user-profile',
                headers: {
                    token: this.state.token
                }
            }).then(profile =>{
                if(!profile.data.hasOwnProperty('error')) { // TODO: handle error with profile
                    this.setState({
                        name: profile.data['name'].split(' ')[0]
                    })
                }
            }).then( () =>{
                if(this.state.token === 'err'){
                    window.location.replace("/")
                    this.props.callback({
                        index: 'landing'
                    })
                }
            })
        })
    }

    componentDidMount() {
        console.log(this.state.token)
        if(this.state.token == '') {
            this.getAccessToken()
        }
    }

    render() {
        return (
            <div style = {{
                height:"100vh",
            }} className = 'globals'>
                <div style = {{
                    position: 'absolute', left: '50%', top: '45%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%'
                }}>
                    <h1 className='header text'>Hello {this.state.name}</h1>
                    <h5 className='text' style={{'text-align': 'center', 'padding-bottom': '15px'}}>
                        How many questions would you like to answer?
                    </h5>
                    <GreenSlider min={4} step={1} max={16} defaultValue={10} valueLabelDisplay='on' onChange={this.handleSliderChange}/>
                    <h5 className='text' style={{'text-align': 'center', 'padding-bottom': '15px', 'padding-top': '15px'}}>
                        Estimated time: {this.state.slider * 6} minutes
                    </h5>
                    <h5 className='text' style={{'text-align': 'center', 'padding-bottom': '15px', 'padding-top': '15px'}}>
                        Please open the Spotify client on your device for the best experience.
                    </h5>
                    <button onClick={this.handlePlayButton} className='button-primary button-colors center'>Start</button>
                </div>

            </div>
        );
    }
}

export default StartPage;