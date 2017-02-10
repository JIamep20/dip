import React from 'react';

import {connect} from 'react-redux';

import RightSidebar from './RightSidebar';
import '../styles/RoomContainerStyles.scss';

class RoomContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {img: `http://placehold.it/400x300/fff`};
    }

    render() {

        var {left, right} = this.props.sidebars;
        left = left ? 'opened-left-sidebar-container ' : '';
        right = right ? 'opened-right-sidebar-container' : '';

        return (
            <div className={`container ${left} ${right}`}>
                <div className="user-video">
                    <img src={this.state.img}/>
                    <img src={this.state.img}/>
                    <img src={this.state.img}/>
                    <img src={this.state.img}/>
                    <img src={this.state.img}/>
                    <img src={this.state.img}/>
                    <img src={this.state.img}/>
                    <img src={this.state.img}/>
                    <img src={this.state.img}/>
                    <img src={this.state.img}/>

                </div>
                <RightSidebar />
            </div>
        );
    }
}

export default connect(
    state => ({
        sidebars: state.sidebars
    })
)(RoomContainer);