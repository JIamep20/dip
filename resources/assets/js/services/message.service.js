import axios from 'axios';

import BaseService from './base.service';

class MessageService extends BaseService {
    constructor(props) {
        super(props);
    }

    /**
     *
     * @param id
     * @returns {*}
     */
    getFriendshipMessages(id) {
        return axios.get(`api/friend/${id}/message`);
    }

    /**
     *
     * @param id
     * @param messageId
     * @returns {*}
     */
    getFriendshipMessage(id, messageId) {
        return axios.get(`api/friend/${id}/message/${messageId}`);
    }

    /**
     *
     * @param id
     * @param data
     * @returns {*|AxiosPromise}
     */
    storeFriendshipMessage(id, data) {
        return axios.post(`api/friend/${id}/message`, data);
    }

    /**
     *
     * @param id
     * @param messageId
     * @param data
     * @returns {AxiosPromise}
     */
    updateFriendshipMessage(id, messageId, data) {
        return axios.put(`api/friend/${id}/message/${messageId}`, data);
    }

    /**
     *
     * @param id
     * @param messageId
     * @returns {*}
     */
    destroyFriendshipMessage(id, messageId) {
        return axios.delete(`api/friend/${id}/message/${messageId}`);
    }

    /**
     *
     * @param id
     * @returns {*}
     */
    getGroupMessages(id) {
        return axios.get(`api/group/${id}/message`);
    }

    /**
     *
     * @param id
     * @param messageId
     * @returns {*}
     */
    getGroupMessage(id, messageId) {
        return axios.get(`api/group/${id}/message/${messageId}`);
    }

    /**
     *
     * @param id
     * @param data
     * @returns {*|AxiosPromise}
     */
    storeGroupMessage(id, data) {
        return axios.post(`api/group/${id}/message`, data);
    }

    /**
     *
     * @param id
     * @param messageId
     * @param data
     * @returns {AxiosPromise}
     */
    updateGroupMessage(id, messageId, data) {
        return axios.put(`api/group/${id}/message/${messageId}`, data);
    }

    /**
     *
     * @param id
     * @param messageId
     * @returns {*}
     */
    destroyGroupMessage(id, messageId) {
        return axios.delete(`api/group/${id}/message/${messageId}`);
    }
}

export default new MessageService();