import React, { Component } from 'react';
import $ from "jquery";

import "./listener.css";


class Listener extends Component {

    constructor(props) {
        super(props);
    }


    voteHandler(e) {
        console.log(e);
        console.log(e.target.value);
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
            <div className="bottom-icons">
                <div className="emoticon">
                    <input className="staticEmotion" type="image" src="https://image.ibb.co/hYDopF/Laugh.png" value="Laugh" onClick={this.voteHandler.bind(this)}/>
                    <img className="pulsingEmotion" src="https://image.ibb.co/hYDopF/Laugh.png" alt="Laugh" />
                </div>
                <div className="emoticon">
                    <input className="staticEmotion" type="image"  src="https://image.ibb.co/dQS3Oa/Love.png" value="Laugh" onClick={this.voteHandler.bind(this)}/>
                    <img className="pulsingEmotion" src="https://image.ibb.co/dQS3Oa/Love.png" alt="Laugh" />
                </div>
                <div className="emoticon">
                    <input className="staticEmotion" type="image" src="https://image.ibb.co/ndVOOa/Like.png" value="Like" onClick={this.voteHandler.bind(this)}/>
                    <img className="pulsingEmotion" src="https://image.ibb.co/ndVOOa/Like.png" alt="Laugh" />
                </div>
            </div> 
        );
    }
}

export default Listener;