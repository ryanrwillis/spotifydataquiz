import React, {Component} from 'react';
import Song from "../song";

const axios = require('axios');

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionNumber: 0,
            lastQuestion: this.props.questions.length - 1
        }
        console.log(this.state.lastQuestion)
    }
    songSelected = (rank) =>{
        if(this.props.questions[this.state.questionNumber][0]['rank'] === rank){
            this.props.questions[this.state.questionNumber][0].winner = 1;
        } else{
            this.props.questions[this.state.questionNumber][1].winner = 1;
        }
        if(this.state.questionNumber == this.state.lastQuestion){
            //TODO: add final screen
            this.props.callback({
                index: 'results',
                questions: this.props.questions
            })
            console.log('last question')
        }
        else {
            this.setState({
                questionNumber: this.state.questionNumber + 1
            })
        }
        // Pause playback
        axios({
            method: 'get',
            url: '/pause-song',
            headers: {
                token: this.props.token
            }
        })
    }
    render() {
        return (
            <div style = {{
                height:"100vh",
            }} className = 'globals'>
                <h3 style={{textAlign: 'center', marginBottom: '0', paddingTop: '15px', paddingBottom:'15px'}}className='header text'>
                    Pick Your Favorite
                </h3>
                <Song song={this.props.questions[this.state.questionNumber][0]} token={this.props.token} callback={this.songSelected}/>
                <Song song={this.props.questions[this.state.questionNumber][1]} token={this.props.token} callback={this.songSelected}/>
            </div>
        );
    }
}

export default Game;