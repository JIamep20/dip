import React from 'react';

class FriendProfile extends React.Component {
    constructor(props) {
        super(props);
        
        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    }

    onDeleteButtonClick() {
        this.props.onDeleteClick(this.props.friend.id);
    }

    render() {
        let { friend } = this.props;
        return (
            <div className="friend-profile">
                <p>{friend.name}</p>
                <button onClick={this.onDeleteButtonClick}>Delete</button>
            </div>
        );
    }
}

export default FriendProfile;