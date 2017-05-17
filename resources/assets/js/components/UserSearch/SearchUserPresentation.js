import React from 'react';
import _ from 'lodash';

import './styles.scss';

export default class SearchUserPresentation extends React.Component {
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
                <input type="submit" value="Пошук" name="search" disabled={!this.state.searchString}
                       className="btn btn-success"/>
            </form>
            <div className="clearfix"></div>
            <div style={{flexGrow: 1, overflowY: 'scroll'}}>
                {!_.size(this.props.users) && <span>0 users found</span>}
                <ul>
                    {
                        _.map(this.props.users, (item, key) => {
                            return (<li style={{margin: '3px 0'}} key={key}>{item.name} <button className="btn btn-success" onClick={() => {this.props.addUserRequest(item.id)}}>Додати</button></li>);
                        })
                    }
                </ul>
            </div>

        </div>);
    }
}