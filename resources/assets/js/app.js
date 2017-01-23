
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import io from 'socket.io-client';

import Tag from './module1.js';
import P from './module2.js';

var App = React.createClass({
    componentWillMount: function () {

    },

    render: function() {
        return (<div>
            <button onClick={this.request}>asd</button>
        </div>);
    },

    request: function() {
        axios.get('http://d.l/api/')
            .then((r) => {
                console.log(r)
            });
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
