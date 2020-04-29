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
            name: ''
        }
    }

    handleSliderChange = (event, value) =>{
        console.log(value)
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
                console.log(profile)
                console.log(profile.data)
                if(!profile.data.hasOwnProperty('error')) { // TODO: handle error with profile
                    this.setState({
                        name: profile.data['name'].split(' ')[0]
                    })
                }
            })
        })
    }

    componentDidMount() {
        console.log(this.state.token)
        if(this.state.token == '') {
            console.log('getting access')
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
                        Please open the Spotify client on your device for the best experience.
                    </h5>
                    <button className='button-primary button-colors center'>Start</button>
                </div>

            </div>
        );
    }
}

export default StartPage;