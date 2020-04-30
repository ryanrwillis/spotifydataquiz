import React, {Component} from 'react';
import Song from "../song";

class Game extends Component {
    render() {
        return (
            <div style = {{
                height:"100vh",
            }} className = 'globals'>
                <Song song={this.props.questions[0][0]}/>
                <Song song={this.props.questions[0][1]}/>
            </div>
        );
    }
}

export default Game;