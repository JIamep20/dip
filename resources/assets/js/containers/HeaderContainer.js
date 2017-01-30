import React from 'react';
import Slideout from 'slideout';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import * as sidebarsActions from '../actions/sidebarsActions';

import './HeaderStyles.scss';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.onLeftToggleClick = this.onLeftToggleClick.bind(this);
        this.onRightToggleClick = this.onRightToggleClick.bind(this);
    }

    onLeftToggleClick(e) {
        e.preventDefault();
        this.props.sidebarsActions.toggleLeftSidebar();
    }

    onRightToggleClick(e) {
        e.preventDefault();
        this.props.sidebarsActions.toggleRightSidebar();
    }

    render() {
        return (
            <header className="clearfix" id="main-nav">
                {<a href="#" className="sidebar-toggle" onClick={this.onLeftToggleClick}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </a>}

                <a href="#" id="touch-menu">Menu</a>
                <ul className="nav clearfix">
                    <li><a href="#">Lorem.</a></li>
                    <li><a href="#">Illum.</a></li>
                    <li><a href="#">Pariatur.</a></li>
                    <li><a href="#">Illum?</a></li>
                    <li><a href="#">Ea?</a></li>
                    <li className="dropdown">
                        <a href="#">Profile</a>
                        <div className="dropdown-content">
                            <a href="">Lorem.</a>
                            <a href="">Nesciunt?</a>
                            <a href="">Omnis.</a>
                        </div>
                    </li>
                </ul>
                <a href="#" className="sidebar-toggle" onClick={this.onRightToggleClick}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </a>
            </header>
        )
    };
}

function mapStateToProps(state) {
    return {
        sidebars: state.sidebars
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sidebarsActions: bindActionCreators(sidebarsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);