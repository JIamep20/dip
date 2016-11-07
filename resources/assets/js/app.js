
import React from 'react';
import ReactDOM from 'react-dom';
import Tag from './module1.js';
import P from './module2.js';

var App = React.createClass({
    render: function() {
        return (<div>
            <Tag />
            <Tag />
            <Tag />
            <Tag />
            <P />
            <P />
            <P />
        </div>);
    }
});

ReactDOM.render(<App />, document.body);
