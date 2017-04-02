import axios from 'axios';

import BaseService from './base.service';

class GroupService extends BaseService {
    constructor(props) {
        super(props);
    }
    
    /**
     *
     * @returns {*}
     */
    getGroups() {
        return axios.get(`api/group`);
    }

    /**
     *
     * @param id
     * @returns {*}
     */
    getGroup(id) {
        return axios.get(`api/group/${id}`);
    }

    /**
     *
     * @param id
     * @param data
     * @returns {*|AxiosPromise}
     */
    storeGroup(id, data = {}) {
        return axios.post(`api/group/${id}`, data);
    }

    /**
     *
     * @param id
     * @param data
     * @returns {AxiosPromise}
     */
    updateGroup(id, data = {}) {
        return axios.put(`api/group/${id}`, data);
    }

    /**
     *
     * @param id
     * @returns {*}
     */
    destroyGroup(id) {
        return axios.delete(`api/group/${id}`);
    }

    /**
     * 
     * @param id
     * @returns {*}
     */
    loadGroupMessages(id) {
        return axios.get(`api/group/${id}/message`);
    }
}

export default new GroupService();