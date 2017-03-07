import axios from 'axios';

import BaseService from './base.service';

class MessagesService extends BaseService {
    constructor(props) {
        super(props);
    }

    getRoomMessages(id) {
        this.beforeRequest();
        return axios.get(`api/room/${id}/message`)
            .then(response => response.data.data)
            .finally(() => nprogress.done());
    }
}

export default new MessagesService();