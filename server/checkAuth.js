var http = require('http');
var config = require('./config.js');

//module.exports = function (token, onSuccess) {

    var responseData = '';

    var request = http.get({path, host, port} = config);

    try {
        request.on('response', function (response) {
            response.on('end', function () {
                var data = responseData;
                console.log(data);
                //console.log(JSON.parse(data));
            });

            response.on('data', function (chunk) {
                responseData += chunk;
                //console.log(chunk);
            });
        });

        request.on('error', function (e) {
            console.log(e.message);
        });

        request.end();

    } catch (error) {
        console.log(error);
    }
//};




