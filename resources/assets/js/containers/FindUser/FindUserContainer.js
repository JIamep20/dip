import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { findUsers, addUser } from '../../actions/UsersActions';

import FindUserPresentation from './FindUserPresentation';

class FindUserContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleSearchUsers = this.handleSearchUsers.bind(this);
        this.addUserRequest = this.addUserRequest.bind(this);
    }

    handleSearchUsers(query) {
        this.props.findUsersActions.findUsers(query);
    }

    addUserRequest(id) {
        this.props.findUsersActions.addUser(id);
    }

    render() {
        return (<FindUserPresentation addUserRequest={this.addUserRequest} users={this.props.users}
                                      searchString={this.props.searchString} searchUsers={this.handleSearchUsers}/>);
    }
}

export default connect(
    state => ({
        searchString: state.users.searchString,
        users: state.users.searchedUsers
    }),
    dispatch => ({
        findUsersActions: bindActionCreators({ findUsers, addUser }, dispatch)
    })
)(FindUserContainer);