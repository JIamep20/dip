import axios from 'axios';

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

    static beforeRequest() {
        nprogress.start();
    }

    static afterRequest() {
        nprogress.done();
    }

    get(...params) {
        this.beforeRequest();
        return axios.get(...params).finally(this.afterRequest);
    }

    post(...params) {
        this.beforeRequest();
        return axios.get(...params).finally(this.afterRequest);
    }

    put(...params) {
        this.beforeRequest();
        return axios.get(...params).finally(this.afterRequest);
    }

    patch(...params) {
        this.beforeRequest();
        return axios.get(...params).finally(this.afterRequest);
    }

    delete(...params) {
        this.beforeRequest();
        return axios.get(...params).finally(this.afterRequest);
    }


}

export default BaseService;