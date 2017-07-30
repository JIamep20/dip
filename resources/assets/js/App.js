import React from 'react';

import { connect } from 'react-redux';

import socketClient from './socketClient';

import './styles/AppResets.scss';
import './styles/AppStyles.scss';

import LeftSidebar from './components/LeftSidebar/index';


class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        socketClient.disconnect();
    }

    render() {
        return (<div className="wrapper">
            <LeftSidebar />
            {this.props.children}
        </div>);
    }
}

export default connect()(App);




/*
 *
 * <aside className="sidebar" id="left-sidebar">
 <ul className="friends">
 {this.state.users.map((item, key) =>
 <li key={key}>
 <a href="#">
 <span className="circle circle-green"></span>
 {item.name}
 </a>
 </li>
 )}
 </ul>
 </aside>
 * */