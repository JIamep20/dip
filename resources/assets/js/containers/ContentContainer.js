import React from 'react';

import { connect } from 'react-redux';

import '../styles/ContentContainerStyles.scss'

class ContentContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {left = false, right = false, sidebars: {left: leftSidebar, right: rightSidebar}} = this.props;
        
        left = left && leftSidebar ? 'opened-left-sidebar-container ' : '';
        right = right && rightSidebar ? 'opened-right-sidebar-container ' : '';
        
        return(<div className={`container ${left} ${right}`}>
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