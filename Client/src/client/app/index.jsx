import React, {Component, Image} from 'react';
import { render } from 'react-dom';

import Singer from './components/singer.jsx';
import Voter from './components/voter.jsx';
import Listener from './components/listener.jsx';

import './main.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { amIElected: true, start: false };
    }

    show() {
        if (!this.state.start) {
            console.log('INIT');
            this.listen();
            return (
                <div className="images">
                    <img className="back" id="one" src="http://stagecast.se/api/content/6968FB86-E5AF-4CD4-9669-39D6F8150ABD/token" />
                    <img className="back" id="two" src="http://stagecast.se/api/content/49AA4A56-2969-486D-B702-EC83532C03FE/token" />
                </div>
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
        //this.isElected() 
        
        this.setState({
            amIElected: true, // TODO
            start: true
        });
        
    }

    isElected() {
        return Math.random() * 10 === 1; 
    }

    // if not start listen the channel 
    listen() {
        
        const socket = new WebSocket(`ws://stagecast.se/api/events/singing/ws?x-user-listener=1`)

        const self = this;

        socket.onmessage = function (event) {
            
            try {
                let json = JSON.parse(event.data)
                console.log("JSON", json);
    
                if (json.msg.start == true) {
                    console.log("START");
                    // I start sisnging, then i close the socket
                    socket.close();
                    setTimeout(
                        () => self.startSinging(), 1000
                    );
                }
            } catch(e){
                console.error("JSON WRONG: "+e);
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
                {/* <Listener /> */}
                
            </div>
        );
    }
}

render(<App />, document.getElementById('app'));