import React, { Component }  from 'react';

class Singer extends Component {
    constructor() {
        super();
        this.state = {
            index: 0,
            verse: "",
            
        }

        this.startKaraoke.bind(this);
        this.printVerse.bind(this);
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
                    {setTimeout(this.startKaraoke(), 5000)}
                </div>
            </div> 
        )
    };
}

export default Singer;