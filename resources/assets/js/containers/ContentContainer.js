import React from 'react';
import './ContentStyles.scss'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Content extends React.Component {
    constructor(props) {
        super(props);

        this.state = {img: `http://placehold.it/400x300/fff`};
    }

    render() {
        var { left, right } = this.props.sidebars;
        left = left ? 'opened-left-sidebar-content ' : '';
        right = right ? 'opened-right-sidebar-content' : '';
        return (
            <div id="content" className={`${left} ${right}`}>
                <div className="user-video">
                    <img src={this.state.img} />
                    <img src={this.state.img} />
                    <img src={this.state.img} />
                    <img src={this.state.img} />
                    <img src={this.state.img} />
                    <img src={this.state.img} />
                    <img src={this.state.img} />
                    <img src={this.state.img} />
                    <img src={this.state.img} />
                    <img src={this.state.img} />

                </div>
            </div>
        );
    }
}

export default connect(
    store => ({
        sidebars: store.sidebars
    })
)(Content);