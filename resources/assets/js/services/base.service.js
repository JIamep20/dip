import axios from 'axios';

class BaseService {
    static beforeRequest() {
        nprogress.start();
    }

    static afterRequest() {
        nprogress.done();
    }

    get(...params) {
        BaseService.beforeRequest();
        return axios.get(...params).finally(BaseService.afterRequest);
    }

    post(...params) {
        BaseService.beforeRequest();
        return axios.get(...params).finally(BaseService.afterRequest);
    }

    put(...params) {
        BaseService.beforeRequest();
        return axios.get(...params).finally(BaseService.afterRequest);
    }

    patch(...params) {
        BaseService.beforeRequest();
        return axios.get(...params).finally(BaseService.afterRequest);
    }

    delete(...params) {
        BaseService.beforeRequest();
        return axios.get(...params).finally(BaseService.afterRequest);
    }


}

export default BaseService;