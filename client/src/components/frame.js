import React, {Component} from 'react';
import Landing from "./pages/landing";
import StartPage from "./pages/startPage";
import Game from "./pages/game";
import Results from "./pages/results";

class Frame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 'landing' // Direct to landing page to start
        }
    }

    upstreamStateChange = (data)=>{
        this.setState(data)
    }

    render() {
        switch(this.state.index) {
            case 'landing':
                return (
                    <Landing callback={this.upstreamStateChange}/>
                )
            case 'start-quiz':
                return(
                    <StartPage callback = {this.upstreamStateChange} code={this.state.code}/>
                )
            case 'game':{
                return(
                    <Game questions = {this.state.questions} token = {this.state.token} callback={this.upstreamStateChange}/>
                )
            }
            case 'results':{
                return(
                    <Results questions={this.state.questions}/>
                )
            }
            default:
                return (
                    <div>
                        <h1 className='text'> It appears an error has occurred.</h1>
                    </div>
                )
        }
    }
}

export default Frame;