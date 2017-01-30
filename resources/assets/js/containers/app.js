import React from 'react';

import { Link } from 'react-router';

import './AppResets.scss';
import './AppStyles.scss';
import '../styles/slideout.scss';

import Header from './HeaderContainer';
import LeftSidebar from './LeftSidebar';
import Content from './ContentContainer';
import RightSidebar from './RightSidebar';

export default class App extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return(<div className="wrapper">
            <Header />
            <LeftSidebar />
            <Content />
            <RightSidebar />
        </div>);
    }
};


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