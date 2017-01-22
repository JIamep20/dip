
import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

import io from 'socket.io-client';

import Tag from './module1.js';
import P from './module2.js';

var App = React.createClass({
    componentWillMount: function () {
        console.log(new Date().toDateString());
    },

    render: function() {
        return (<div>
            <P />
        </div>);
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
