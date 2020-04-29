import React, {Component} from 'react';
import  {withStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

// I have taken this slider styling from https://material-ui.com/components/slider/. None of the below styling is my own.
const PrettoSlider = withStyles({
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
    handleSliderChange = (event, value) =>{
        console.log(value)
    }
    render() {
        return (
            <div style = {{
                height:"100vh",
            }} className = 'globals'>
                <h1 className='header text'>{this.props.code}</h1>
                <div className='center' style = {{
                    width: '50%'
                }}>
                    <h5 className='text' style={{'text-align': 'center', 'padding-bottom': '15px'}}>How many questions would you like to answer?</h5>
                    <PrettoSlider min={4} step={1} max={16} defaultValue={10} valueLabelDisplay='on' onChange={this.handleSliderChange}/>
                </div>

            </div>
        );
    }
}

export default StartPage;