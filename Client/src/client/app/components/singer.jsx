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

        this.startKaraoke.bind(this);
        this.printVerse.bind(this);

        console.log(song);
        let lyrics = song.lyrics;
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
        }, 3000);
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