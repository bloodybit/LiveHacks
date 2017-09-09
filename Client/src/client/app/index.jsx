import React, {Component} from 'react';
import { render } from 'react-dom';

import Singer from './components/singer.jsx';
import Voter from './components/voter.jsx';



class App extends Component {

    constructor(props) {
        super(props);
        this.state = { amIElected: false };
    }

    show() {
        if (this.state.amIElected) {
            console.log('Sinz');
            return (
                <Singer />
            );
        } else {
            console.log("votz");
            return (
                <Voter />
            )
        }
    }

    election() {
        this.setState({
            amIElected: parseInt(Math.random() * 10) == 1,
        });
        console.log("You are elected: ", this.state.amIElected? "true" : "false");
        console.log(this.state);
    }

    componentDidMount() {
        //this.interval = setInterval(() => this.election(), 5000);
    }

    render() {
        return (
            <div>
                <p> Hello React!</p>
                { this.show() }
                <Listener />
            </div>
        );
    }
}

render(<App />, document.getElementById('app'));