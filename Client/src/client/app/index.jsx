import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { amIElected: false };
    }
    
    election() {
        this.setState({
            amIElected: parseInt(Math.random() * 10) == 1,
        });
        console.log("You are elected: ", this.state.amIElected? "true" : "false");
        console.log(this.state);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.election(), 5000);
    }

    render() {
        return (
            <div>
                <p> Hello React!</p> 
                <h1>AM I elected: {this.state.amIElected}</h1>
            </div>
        );
    }
}

render(<App />, document.getElementById('app'));