import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded';

class Song extends Component {
    // props: song
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h5 style={{textAlign: 'center', marginBottom: '0rem', paddingTop: '1rem'}}className='text'>{this.props.song['name']}</h5>
                <h5 style={{textAlign: 'center', marginBottom: '1rem'}} className='text'>{this.props.song.artists[0].name}</h5>
                <img style = {{paddingTop: '0px', marginBottom:'5rem'}}className ='image-center' style={{height: '25vh', width:'25vh'}} src={this.props.song.album.images[1].url}/>
                <IconButton style={{marginLeft: 'auto', marginRight: 'auto', marginBottom:'3rem', display: 'block'}}><PlayCircleFilledRoundedIcon className='image-center' style={{'font-size': '5rem', fill:'#ffffff'}} fontSize='large'/></IconButton>
            </div>
        );
    }
}

export default Song;