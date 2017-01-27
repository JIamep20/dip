import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component{

    render() {console.log(this.props.children);
        return(<div>
            {this.props.children}
            <Link to="/module1">Module1</Link>
            <Link to="/module2">Module2</Link>
        </div>);
    }
};

