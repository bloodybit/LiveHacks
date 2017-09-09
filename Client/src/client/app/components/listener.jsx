import React, { Component } from 'react';
import $ from "jquery";

import "./listener.css";


class Listener extends Component {

    constructor(props) {
        super(props);
        this.movement();
    }


    movement() {
        
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

    render() {
        return (
            <div>
            </div> 
        );
    }
}

export default Listener;