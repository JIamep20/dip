import React from 'react';
import './ContentStyles.scss'

export default class Content extends React.Component {
    constructor(props) {
        super(props);

        this.state = {img: `http://placehold.it/400x300/fff`};
    }

    render() {
        return (
            <div className="slideout-panel" id="content">
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