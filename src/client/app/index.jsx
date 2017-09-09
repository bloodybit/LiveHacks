import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
    render() {
        return (
            <div>
                <p> Hello React!@Q@@fmdi</p>
                <p> Piotr Gay</p>
            </div>
        );
    }
}

render(<App />, document.getElementById('app'));