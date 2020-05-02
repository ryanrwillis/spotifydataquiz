import React, {Component} from 'react';

class Results extends Component {

    calculateScore = () =>{
        let score = 0;
        this.props.questions.forEach(question =>{
            // Determine winner
            let winner;
            for(let i = 0; i < 2; i++){
                if(question[i].hasOwnProperty('winner')) {winner = i; break}
            }
            score += question[winner^1].rank - question[winner].rank;
        })
        return score
    }

    getScoreMessage = (score) =>{
        if(score >= 0) return 'Your score is positive. Spotify\'s algorithm is accurate with your tastes in music to an extent.';
        else return 'Uh-oh, Spotify has a different idea about your tastes in music than you do.';
    }


    render() {
        return (
            <div style = {{
                height:"100vh",
            }} className = 'globals'>
                <div style = {{
                    position: 'absolute', left: '50%', top: '45%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <h1 className='text header'>Your Results</h1>
                    <h4 className='text' style = {{'text-align': 'center'}}> You scored {this.calculateScore()} points.</h4>
                    <h5 className='text' style = {{'text-align': 'center'}}>{this.getScoreMessage(this.calculateScore())}</h5>
                </div>
            </div>

        );
    }
}

export default Results;