import React from 'react';

import { connect } from 'react-redux';
import {Link} from 'react-router';

import '../styles/AppResets.scss';
import '../styles/AppStyles.scss';

import Header from './HeaderContainer';
import LeftSidebar from './LeftSidebar';


class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="wrapper">
            <Header />
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