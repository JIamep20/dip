import BaseService from './base.service';

class FeedService extends BaseService {
    fetchFeeds() {
        return this.get(`api/feed`);
    }
}

export default new FeedService();