import React, {Component} from 'react';
import Landing from "./pages/landing";

class Frame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 'landing' // Direct to landing page to start
        }
    }

    render() {
        switch(this.state.index) {
            case 'landing':
                return (
                <Landing/>
                )
            default:
                return (
                    <div>
                        <h1> It appears an error has occurred.</h1>
                    </div>
                )
        }
    }
}

export default Frame;