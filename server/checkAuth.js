var http = require('http');
var config = require('./config.js');

module.exports = function (token, cb) {

    var responseData = '';

    const {path, host, port} = config;

    var request = http.get(Object.assign({}, {path, host, port}, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-Requested-With": "XMLHttpRequest",
            'Cookie': "x-access-token=" + token.token
        }
    }));

    try {
        request.on('response', function (response) {
            if(response.statusCode < 200 || response.statusCode > 299)
            {
                console.error(`Some undefined error. Code: ${response.statusCode}, Message: ${response.statusMessage}`);
                cb(true);
                return;
            }
            response.on('end', function () {
                console.log(responseData);
                cb(false, JSON.parse(responseData));
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




