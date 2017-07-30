import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import './LeftSidebarStyles.scss';

import {STATUS_ACCEPTED, STATUS_BLOCKED, STATUS_DENIED, STATUS_PENDING} from '../../constants/friendshipsActionsConst';

export default class LeftSidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {tab: 1};
    }

    render() {
        return (
            <div className="left-sidebar">
                <div id="sidebar-control-buttons">
                    <button className="btn btn-success" onClick={() => this.setTab(1)}>Friends</button>
                    <button className="btn btn-success" onClick={() => this.setTab(2)}>Groups</button>
                </div>
                <div className="handbook">
                    {
                        this.state.tab == 1 &&
                            this.getFriendshipsList()
                    }
                    {
                        this.state.tab == 2 &&
                            this.getGroupsList()
                    }
                </div>
            </div>
        );
    }

    setTab(tabId) {
        this.setState({tab: tabId});
    }

    getFriendshipsList() {
        let { friendships } = this.props;
        return (<ul>{_.map(friendships, (item, index) => (
            <li key={index}>
                <Link to={`/friend/${item.friendObject.id}`}>
                    <span className={`circle ${this.getCircleStatus(item)}`} />{item.friendObject.name}
                </Link>
            </li>
            ))}
            </ul>
        );
    }

    getGroupsList() {
        let { groups } = this.props;
        return (<ul>{_.map(groups, (item, index) => (<li key={index}><Link to={`groups/${item.id}`}>{item.name}</Link></li>))}</ul>);
    }
    
    getCircleStatus(item) {
        let status = item.status;
        switch (status) {
            case STATUS_PENDING:
                return 'circle-grey';
            case STATUS_BLOCKED:
                return 'circle-black';
            case STATUS_DENIED:
                return 'circle-grey';
            case STATUS_ACCEPTED:
                let { online } = this.props;
                if (online[item.id]) {
                    return 'circle-green';
                } else {
                    return 'circle-red';
                }
            default: return '';
        }
    }
}