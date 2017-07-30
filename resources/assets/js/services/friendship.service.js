import BaseService from './base.service';

class FriendshipService extends BaseService {
    /**
     *
     * @returns {*}
     */
    fetchFriendships() {
        return this.get('api/friend');
    }

    /**
     *
     * @param id
     * @returns {*}
     */
    fetchFriendship(id) {
        return this.get(`api/friend/${id}`);
    }

    /**
     *
     * @param id
     * @returns {*|AxiosPromise}
     */
    storeFriendship(id) {
        return this.post(`api/friend/${id}`);
    }

    /**
     * 
     * @param id
     * @param data
     * @returns {AxiosPromise}
     */
    updateFriendship(id, data = {}) {
        return this.put(`api/friend/${id}`, data);
    }

    /**
     *
     * @param id
     * @returns {*}
     */
    destroyFriendship(id) {
        return this.delete(`api/friend/${id}`);
    }

    /**
     * 
     * @param id
     * @returns {*}
     */
    fetchFriendshipMessages(id) {
        return this.get(`api/friend/${id}/message`);
    }

    /**
     *
     * @param id
     * @param text
     * @returns {*|AxiosPromise}
     */
    createFriendshipMessage(id, text) {
        return this.post(`api/friend/${id}/message`, {text: text});
    }

    
}

export default new FriendshipService();