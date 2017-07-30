var config = require('./config.js');

var axios = require('axios');

module.exports = function (token, cb) {

    if (!token) {
        cb('Empty token');
    }

    const {serverProtocol, serverHost} = config;

    axios.get(`${serverProtocol}${serverHost}/api/user`, {
        headers: {'Authorization': token}
    }).then(function (response) {
        cb(false, response.data.data);
    }).catch(function (error) {
        console.log(error.response.data);
        cb(error.response.data);
    });
};




