import axios from 'axios';

import BaseService from './base.service';

class FeedService extends BaseService {
    constructor(props) {
        super(props);
    }

    fetchFeeds() {
        return axios.get(`api/feed`);
    }
}

export default new FeedService();