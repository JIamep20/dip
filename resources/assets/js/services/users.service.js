import axios from 'axios';

class UsersService {
    constructor() {

    }
    
    fetchCurrentUser() {
        return axios.get('api/user');
    }
    
    updateCurrentUser(data) {
        return axios.put('api/user', data);
    }

    findUsers(string) {
        return axios.get(`api/users/${string}`);
    }

    addUser(id) {
        return axios.post(`api/users/${id}`)
            .then(response => this.transformFriendModel(response.data.data));
    }
    
    fetchFriends() {
        return axios.get('api/friends')
            .then(({data}) => {
                return data.data.map((user) => {
                    return this.transformFriendModel(user);
                });
            });
    }

    transformFriendModel(user) {
        user.user = user.invited || user.initiator;
        delete user.invited; delete user.initiator;
        return user;
    }
}

const exp = new UsersService();
export default exp;