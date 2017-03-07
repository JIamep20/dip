class BaseService {
    constructor(props) {

    }

    transformFriendshipModels(users, store) {
        const { id } = store.currentUser.user;
        return _.map(users, user => this.transformFriendshipModel(user, id));
    }

    transformFriendshipModel(user, id) {
        user.user = user.sender.id != id ? user.sender : user.recipient;
        delete user.sender; delete user.recipient;
        return user;
    }

    beforeRequest() {
        nprogress.start();
    }
}

export default BaseService;