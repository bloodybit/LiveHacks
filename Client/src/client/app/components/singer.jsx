import React, { Component }  from 'react';
import $ from 'jquery';

import song from './../song.js';

import './singer.css';

class Singer extends Component {
    constructor() {
        super();
        this.state = {
            index: 0,
            verse: "",
            
        }

        this.listen = this.listen.bind(this);
        this.strangerVote = this.strangerVote.bind(this);
        this.listen();
        
        this.startKaraoke.bind(this);
        this.printVerse.bind(this);

        console.log(song);
        let lyrics = song.lyrics.reverse();
        function play(lyrics) {
            let line = lyrics.pop()

            $('#singThis').fadeOut("slow", function () {
                var div = $(`<p id="singThis">${line.text}</p>`).hide();
                $(this).replaceWith(div);
                $('#singThis').fadeIn("slow");
            });

            console.log(line.text);

            setTimeout(() => {
                if (lyrics.length != 0){
                    play(lyrics);
                } else {
                    $('#singThis').replaceWith(`<p id="singThis">Done!</p>`);
                }
            }, line.time);
        };

        play(lyrics);
        setTimeout(() => {
            $('#sing').remove();
            $('#mic').remove();
        }, 2000);
    }
    printVerse() {
        console.log(this.state.index);
        // if (this.state.index < this.state.song.length) {
        //     //this.setState({verse: this.state.song[this.state.index]});
        // }
        // // this.tick();
        // this.setState((prevState) => ({
        //     index: prevState.index + 1
        //   }));
    }
    startKaraoke() {
        const self = this;
        //setInterval(() => this.printVerse(), 2000);
        
    }
    strangerVote(vote) {
        console.log("strangerVote");
        console.log(vote);
        const emotion = vote;
        console.log(`#${emotion}`);

        let path = "";
        switch (emotion) {
            case "Love":
                path = "https://image.ibb.co/dQS3Oa/Love.png";
                break;
            case "Laugh":
                path = "https://image.ibb.co/hYDopF/Laugh.png";
                break;
            case "Like":
                path = "https://image.ibb.co/ndVOOa/Like.png";
                break;
        }
        $('body').append(`<div class="b" style="position:absolute; opacity: 0.7; bottom:-150px; left:${Math.random() * 600};"><img class="small-img" src="${path}"/></div>`);
        $(".b").animate({ bottom: "+=13300", left: `+=${Math.random() * 2300}` }, 15000, "swing");

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
            <div>
                <div className="singback">
                    <h1 id="sing" className="fadeIn">Sing with us</h1>
                    <img id="mic" src="http://stagecast.se/api/content/75CC4EB8-C398-4286-9EF8-E3CD3A68C503/token" />
                    <div className="text">
                        <p id="singThis"></p>
                    </div>
                </div>
            </div> 
        )
    };
}

export default Singer;