import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
const axios = require('axios')

class Song extends Component {
    // props: song, token, callback
    constructor(props) {
        super(props);
    }

    onPlayPress = event =>{
        event.preventDefault();
        axios({
            method: 'get',
            url: '/play-song',
            headers: {
                token: this.props.token,
                uri: this.props.song.uri
            }
        })
    }

    onSelect = event =>{
        event.preventDefault();
        this.props.callback(this.props.song.rank)
    }

    render() {
        return (
            <div>
                <button
                    style={{paddingTop: '0px', marginBottom:'0', height: '25vh', paddingRight: '0px', paddingLeft:'0px', border:'0px'}}
                    className='button-center'
                    onClick={this.onSelect} >
                    <img className = 'image-center' style={{ paddingTop: '0px', marginBottom:'5rem',  height: '25vh', width:'25vh', marginRight: '0'}}
                         src={this.props.song.album.images[1].url}/>
                </button>
                <h5 style={{textAlign: 'center', marginBottom: '0rem', lineHeight: '1.1', paddingTop: '5px'}}className='text'>{this.props.song['name']}</h5>
                <h6 style={{textAlign: 'center', marginBottom: '0rem', lineHeight: '1.1'}} className='text'>{this.props.song.artists[0].name}</h6>
                <IconButton style={{marginLeft: 'auto', marginRight: 'auto', marginBottom:'4rem', display: 'block', paddingTop: '0px'}}
                    onClick = {this.onPlayPress}>
                    <PlayCircleOutlineIcon className='image-center' style={{'font-size': '4rem', fill:'#ffffff'}} fontSize='large'/>
                </IconButton>
            </div>
        );
    }
}

export default Song;