var http = require('http');
var config = require('./config.js');

module.exports = function (token, onSuccess) {

    var responseData = '';

    const {path, host, port} = config;

    var request = http.get(Object.assign({}, {path, host, port}, {
        headers: {
            'Accept': '/',
            'Cookie': "x-access-token=" + 123
        }
    }));

    try {
        request.on('response', function (response) {
            response.on('end', function () {
                onSuccess(JSON.parse(responseData));
            });

            response.on('data', function (chunk) {
                responseData += chunk;
            });
        });

        request.on('error', function (e) {
            console.log(e.message);
        });

        request.end();

    } catch (error) {
        console.log(error);
    }
};




