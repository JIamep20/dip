import axios from 'axios';

import BaseService from './base.service';

class UsersService extends BaseService{
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
        return axios.get(`api/friends/${string}`);
    }

    addUser(id) {
        return axios.post(`api/friends/${id}`)
            .then(response => this.transformFriendModel(response.data.data));
    }
}

const exp = new UsersService();
export default exp;