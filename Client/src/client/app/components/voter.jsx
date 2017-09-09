import React, { Component } from 'react';

class Voter extends Component {

    constructor(props) {
        super(props);
    }

    click(e) {

        console.log("Clicked", e.target.value);
        const emotion = e.target.value;

        const socket = new WebSocket(`ws://stagecast.se/api/events/comments/ws?x-user-listener=1`);
        socket.onopen = (e) => {
            console.log("EMOTION: ", emotion);
            socket.send(`"${emotion}"`);
        };
    }

    render() {
        return (
            <div>
                <h1>Vote...</h1>

                <button onClick={this.click.bind(this)} value="Love">Love</button>
                <button onClick={this.click.bind(this)} value="Funny">Funny</button>
                <button onClick={this.click.bind(this)} value="Like">Like</button>
            </div>
        )
    };
}

export default Voter;