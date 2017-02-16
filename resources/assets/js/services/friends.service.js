import axios from 'axios';

import BaseService from './base.service';

class FriendsService extends BaseService{
    constructor(props) {
        super(props);
    }

    fetchFriends() {
        return axios.get('api/friends')
            .then(({data}) => {
                return data.data.map((user) => {
                    return this.transformFriendModel(user);
                });
            });
    }
    
}

export default new FriendsService();