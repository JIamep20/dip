import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './RightSidebarStyles.scss';

class RightSidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        var {right} = this.props.sidebars;
        right = right ? 'opened-right-sidebar' : '';

        return(<div className={`right-sidebar ${right}`}>
            <ul className="messages">
                <li>
                    <div className="sender">Lorem ipsum.<span className="send-date">Lorem ipsum.</span></div>
                    <hr />
                    <div className="message">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, harum?</div>
                </li>
                <li>
                    <div className="sender">Porro, tenetur.<span className="send-date">Lorem ipsum.</span></div>
                    <hr />
                    <div className="message">Beatae debitis explicabo fugiat magni nihil placeat quis, sed velit.</div>
                </li>
                <li>
                    <div className="sender">Molestiae, placeat.<span className="send-date">Lorem ipsum.</span></div>
                    <hr />
                    <div className="message">Autem ea eius nulla officia qui quis recusandae sunt voluptatem.</div>
                </li>
            </ul>
        </div>);
    }
}

export default connect(
    store => ({
        sidebars: store.sidebars
    })
)(RightSidebar);