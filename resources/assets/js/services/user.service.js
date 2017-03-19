import axios from 'axios';

import BaseService from './base.service';

class UserService extends BaseService{
    constructor(props) {
        super(props);
    }
    
    fetchCurrentUser() {
        return axios.get('api/user');
    }
    
    updateCurrentUser(data) {
        return axios.put('api/user', data);
    }

    findUsers(string) {
        return axios.get(`api/user/${string}`);
    }
}

export default new UserService();