import axios from 'axios';

import BaseService from './base.service';

class FriendshipService extends BaseService {
    constructor(props) {
        super(props);
    }

    /**
     *
     * @returns {*}
     */
    getFriends() {
        return axios.get('api/friend');
    }

    /**
     *
     * @param id
     * @returns {*}
     */
    getFriend(id) {
        return axios.get(`api/friend/${id}`);
    }

    /**
     *
     * @param id
     * @returns {*|AxiosPromise}
     */
    storeFriend(id) {
        return axios.post(`api/friend/${id}`);
    }

    /**
     * 
     * @param id
     * @param data
     * @returns {AxiosPromise}
     */
    updateFriend(id, data = {}) {
        return axios.put(`api/friend/${id}`, data);
    }

    /**
     *
     * @param id
     * @returns {*}
     */
    destroyFriend(id) {
        return axios.delete(`api/friend/${id}`);
    }

    /**
     * 
     * @param id
     * @returns {*}
     */
    loadFriendMessages(id) {
        return axios.get(`api/friend/${id}/message`);
    }

    /**
     *
     * @param id
     * @param text
     * @returns {*|AxiosPromise}
     */
    createFriendMessage(id, text) {
        return axios.post(`api/friend/${id}/message`, {text: text});
    }

    
}

export default new FriendshipService();