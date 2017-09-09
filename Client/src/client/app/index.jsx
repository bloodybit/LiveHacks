import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { amIElected: false };
        this.listen();
    }
    
    listen() {
        const socket = new WebSocket(`ws://stagecast.se/api/events/comments/ws?x-user-listener=1`)

        socket.onmessage = function (event) {

            console.log(event.data);

            let json = JSON.parse(event.data)
            console.log("JSON", json);
            if (json.msg == "end") {
                console.log("END");
            }

            if (json.msg == "begin") {
                console.log(json.msg);
            }
        }

        socket.onerror = function () {
            console.log("error")
        }

        socket.onopen = function () {
            console.log("connected to socket")
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