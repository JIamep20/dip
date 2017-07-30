import BaseService from './base.service';

class UserService extends BaseService{
    fetchCurrentUser() {
        return this.get('api/user');
    }
    
    updateCurrentUser(data) {
        return this.put('api/user', data);
    }

    findUsers(string) {
        return this.get(`api/user/${string}`);
    }
}

export default new UserService();