import React from 'react';

import { connect } from 'react-redux';

import '../styles/ContentContainerStyles.scss'

class ContentContainer extends React.Component {
    constructor(props) {
        super(props);


    }

    render() {
        var {left} = this.props.sidebars;
        left = left ? 'opened-left-sidebar-container ' : '';
        return(<div className={`container ${left}`}>
            {this.props.children}
        </div>);
    }
}

export default connect(
    (store, ownProps) => ({
        ownProps: ownProps,
        sidebars: store.sidebars
    })
)(ContentContainer);