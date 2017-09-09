import React, {Component} from 'react';
import { render } from 'react-dom';

import Singer from './components/singer.jsx';
import Voter from './components/voter.jsx';
import Listener from './components/listener.jsx';

import './main.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { amIElected: false, start: false };
    }

    show() {
        if (!this.state.start) {
            console.log('INIT');
            this.listen();
            return (
                <div></div>
            );
        } else if (this.state.amIElected) {
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

    startSinging() {
        this.setState({
            amIElected: false,
            start: true
        });
    }

    listen() {
        const socket = new WebSocket(`ws://stagecast.se/api/events/singing/ws?x-user-listener=1`)

        const self = this;

        socket.onmessage = function (event) {
            console.log(event.data);

            let json = JSON.parse(event.data)
            console.log("JSON", json);

            if (json.msg.start == true) {
                console.log("START");
                setTimeout(
                    () => self.startSinging(), 5000
                );
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
        this.startSinging();
        console.log("You are elected: ", this.state.amIElected? "true" : "false");
        console.log(this.state);
    }

    componentDidMount() {
        //this.interval = setInterval(() => this.election(), 5000);
    }

    render() {
        return (
            <div>
                { this.show() }
                <Listener />
            </div>
        );
    }
}

render(<App />, document.getElementById('app'));