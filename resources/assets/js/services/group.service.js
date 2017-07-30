import BaseService from './base.service';

class GroupService extends BaseService {
    /**
     *
     * @returns {*}
     */
    getGroups() {
        return this.get(`api/group`);
    }

    /**
     *
     * @param id
     * @returns {*}
     */
    getGroup(id) {
        return this.get(`api/group/${id}`);
    }

    /**
     * 
     * @param data
     * @returns {AxiosPromise|*}
     */
    storeGroup(data) {
        return this.post(`api/group`, data);
    }

    /**
     *
     * @param id
     * @param data
     * @returns {AxiosPromise}
     */
    updateGroup(id, data = {}) {
        return this.put(`api/group/${id}`, data);
    }

    /**
     *
     * @param id
     * @returns {*}
     */
    destroyGroup(id) {
        return this.delete(`api/group/${id}`);
    }

    /**
     * 
     * @param id
     * @returns {*}
     */
    loadGroupMessages(id) {
        return this.get(`api/group/${id}/message`);
    }

    /**
     * 
     * @param id
     * @returns {*}
     */
    leaveGroup(id) {
        return this.get(`api/group/${id}/leave`);
    }

    addUserToGroupById(group_id, user_id) {
        return this.get(`api/group/${group_id}/adduser/${user_id}`);
    }
}

export default new GroupService();