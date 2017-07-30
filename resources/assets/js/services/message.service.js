import BaseService from './base.service';

class MessageService extends BaseService {
    /**
     *
     * @param id
     * @returns {*}
     */
    getFriendshipMessages(id) {
        return this.get(`api/friend/${id}/message`);
    }

    /**
     *
     * @param id
     * @param messageId
     * @returns {*}
     */
    getFriendshipMessage(id, messageId) {
        return this.get(`api/friend/${id}/message/${messageId}`);
    }

    /**
     *
     * @param id
     * @param data
     * @returns {*|AxiosPromise}
     */
    storeFriendshipMessage(id, data) {
        return this.post(`api/friend/${id}/message`, data);
    }

    /**
     *
     * @param id
     * @param messageId
     * @param data
     * @returns {AxiosPromise}
     */
    updateFriendshipMessage(id, messageId, data) {
        return this.put(`api/friend/${id}/message/${messageId}`, data);
    }

    /**
     *
     * @param id
     * @param messageId
     * @returns {*}
     */
    destroyFriendshipMessage(id, messageId) {
        return this.delete(`api/friend/${id}/message/${messageId}`);
    }

    /**
     *
     * @param id
     * @returns {*}
     */
    getGroupMessages(id) {
        return this.get(`api/group/${id}/message`);
    }

    /**
     *
     * @param id
     * @param messageId
     * @returns {*}
     */
    getGroupMessage(id, messageId) {
        return this.get(`api/group/${id}/message/${messageId}`);
    }

    /**
     *
     * @param id
     * @param data
     * @returns {*|AxiosPromise}
     */
    storeGroupMessage(id, data) {
        return this.post(`api/group/${id}/message`, data);
    }

    /**
     *
     * @param id
     * @param messageId
     * @param data
     * @returns {AxiosPromise}
     */
    updateGroupMessage(id, messageId, data) {
        return this.put(`api/group/${id}/message/${messageId}`, data);
    }

    /**
     *
     * @param id
     * @param messageId
     * @returns {*}
     */
    destroyGroupMessage(id, messageId) {
        return this.delete(`api/group/${id}/message/${messageId}`);
    }
}

export default new MessageService();