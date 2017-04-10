import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { fetchUsersByFilterString, addUserToFriendsById } from '../../actions/usersActions';

import SearchUserPresentation from './SearchUserPresentation';
import Container from '../ContentContainer';

class SearchUserContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleSearchUsers = this.handleSearchUsers.bind(this);
        this.addUserRequest = this.addUserRequest.bind(this);
    }

    handleSearchUsers(query) {
        this.props.findUsersActions.fetchUsersByFilterString(query);
    }

    addUserRequest(id) {
        this.props.findUsersActions.addUserToFriendsById(id);
    }

    render() {
        return (<Container left={true}>
            <SearchUserPresentation
                addUserRequest={this.addUserRequest} 
                users={this.props.users}
                searchString={this.props.searchFilter}
                searchUsers={this.handleSearchUsers}/>
        </Container>);
    }
}

export default connect(
    state => ({
        searchFilter: state['usersReducer']['searchFilter'],
        users: state['usersReducer']['searchedUsers']
    }),
    dispatch => ({
        findUsersActions: bindActionCreators({ fetchUsersByFilterString, addUserToFriendsById }, dispatch)
    })
)(SearchUserContainer);