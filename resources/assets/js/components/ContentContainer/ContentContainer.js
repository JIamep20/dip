import React from 'react';

import './ContentContainerStyles.scss'

export default (props) => {
    return (<div className="container">{props.children}</div>);
};