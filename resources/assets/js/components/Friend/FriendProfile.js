import React from 'react';

class FriendProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { friend } = this.props;
        return (
            <div className="friend-profile">
                <p>{friend.name}</p>
            </div>
        );
    }
}

export default FriendProfile;