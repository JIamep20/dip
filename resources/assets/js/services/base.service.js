class BaseService {
    constructor(props) {

    }

    transformFriendModel(user) {
        user.user = user.invited || user.initiator;
        delete user.invited; delete user.initiator;
        return user;
    }
}

export default BaseService;