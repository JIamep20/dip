import React from 'react';


import '../styles/ContentContainerStyles.scss'

class ContentContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        left = left && leftSidebar ? 'opened-left-sidebar-container ' : '';
        right = right && rightSidebar ? 'opened-right-sidebar-container ' : '';
        
        return(<div className={`container ${left} ${right}`}>
            {this.props.children}
        </div>);
    }
}

export default ContentContainer;