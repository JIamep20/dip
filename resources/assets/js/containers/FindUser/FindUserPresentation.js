import React from 'react';

import './styles.scss';

export default class FindUserPresentation extends React.Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {searchString: this.props.searchString || ''};
    }

    onInputChange({target}) {
        this.setState({searchString: target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!!this.state.searchString && this.state.searchString !== this.props.searchString) {
            this.props.searchUsers(this.state.searchString);
        }
    }

    render() {
        return (<div className="find-user-presentation-wrapper">
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="search-text" value={this.state.searchString} onChange={this.onInputChange}/>
                <input type="submit" value="Search" name="search" disabled={!this.state.searchString}
                       className="btn btn-submit"/>
            </form>
            <div className="clearfix"></div>
            {!this.props.users.length && <span>0 users found</span>}
            <ul>
                {this.props.users.map((user, index) => {
                    return (<li key={index}>{user.name} <button onClick={() => {this.props.addUserRequest(user.id)}}>Add</button></li>);
                })}
            </ul>
        </div>);
    }
}