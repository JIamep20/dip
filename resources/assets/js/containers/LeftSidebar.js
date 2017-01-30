import React from 'react';
import axios from 'axios';

import {connect} from 'react-redux';

import './LeftSidebarStyles.scss';

class LeftSidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {users: []};
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((req) => {
                this.setState({users: [...req.data, ...req.data, ...req.data, ...req.data]});
            });
    }

    render() {

        const {users} = this.state;
        const {left} = this.props.sidebars;
        var opened = left ? 'opened-left-sidebar' : '';
        return (
            <div className={`left-sidebar ${opened}`}>
                <ul className="friends">
                    {users.map((item, key) => {
                        return (<li key={key}>
                            <a href="#">
                                <span className="circle circle-green"></span>
                                {item.name}
                            </a>
                        </li>)
                    })}
                </ul>
            </div>
        );
    }
}

export default connect(
    state => ({sidebars: state.sidebars})
)(LeftSidebar);