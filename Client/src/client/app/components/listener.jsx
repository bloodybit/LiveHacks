import React, { Component } from 'react';
import $ from "jquery";

import "./listener.css";


class Listener extends Component {

    constructor(props) {
        super(props);
        this.listen = this.listen.bind(this);
        this.strangerVote = this.strangerVote.bind(this);
        this.listen();
    }


    voteHandler(e) {
        console.log("Clicked", e.target.value);
        const emotion = e.target.value;

        const socket = new WebSocket(`ws://stagecast.se/api/events/comments/ws?x-user-listener=1`);
        socket.onopen = (e) => {
            console.log("EMOTION: ", emotion);
            socket.send(`"${emotion}"`);
        };
    }

    strangerVote(vote) {
        console.log("strangerVote");
        console.log(vote);
        const emotion = vote;
        console.log(`#${emotion}`);
        $(`#${emotion}`).animate({
            height: "120px",
            width: "120px"
        }, 200, function () {
            $(`#${emotion}`).animate({
                height: "100px",
                width: "100px"
            }, 200)
        });
    }

    listen() {
        const socket = new WebSocket(`ws://stagecast.se/api/events/comments/ws?x-user-listener=1`)

        const that = this;

        socket.onmessage = function (event) {

            console.log("Event");
            console.log(event.data);

            let json = JSON.parse(event.data)
            console.log("JSON", json);
            if (json.msg == "Love" || json.msg == "Laugh" || json.msg == "Like") {
                console.log("EMOTION RECEIVED");
                that.strangerVote(json.msg);
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
                    <input className="staticEmotion" id="Laugh" type="image" src="https://image.ibb.co/hYDopF/Laugh.png" value="Laugh" onClick={this.voteHandler.bind(this)}/>
                </div>
                <div className="emoticon">
                    <input className="staticEmotion" id="Love" type="image"  src="https://image.ibb.co/dQS3Oa/Love.png" value="Love" onClick={this.voteHandler.bind(this)}/>
                </div>
                <div className="emoticon">
                    <input className="staticEmotion" id="Like" type="image" src="https://image.ibb.co/ndVOOa/Like.png" value="Like" onClick={this.voteHandler.bind(this)}/>
                </div>
            </div> 
        );
    }
}

export default Listener;