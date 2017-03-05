import axios from 'axios';

import BaseService from './base.service';

class FriendsService extends BaseService{
    constructor(props) {
        super(props);
    }

    fetchFriends(store) {
        return axios.get('api/friends')
            .then(({data}) => this.transformFriendshipModels(data.data, store));
    }
    
}

export default new FriendsService();