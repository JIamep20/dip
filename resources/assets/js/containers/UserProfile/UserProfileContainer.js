import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { updateCurrentUser } from '../../actions/UsersActions';
import UserProfileForm from './UserProfileForm';

import '../../styles/ProfileStyles.scss';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.saveUser = this.saveUser.bind(this);
    }

    render() {
        return(
            <UserProfileForm
                user={this.props.user}
                saveUser={this.saveUser}
                errors = {this.props.errors}
            />
        )
    }

    saveUser(user) {
        this.props.currentUserActions.updateCurrentUser(user);
    }

}

export default connect(
    state => ({
        user: state.currentUser.user,
        errors: state.currentUser.errors
    }),
    dispatch => ({
        currentUserActions: bindActionCreators({updateCurrentUser}, dispatch)
    })
)
(Profile);