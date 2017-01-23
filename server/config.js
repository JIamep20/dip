var config = {};

try {
    config = require('config.dev.js');
} catch (e) {
    console.log('Dev config not found.');

    try {
        config = require('./config.prod.js');
    } catch(e) {
        console.log("Prod config not found. Generating default values.");
        config = {
            socketPort: 3000,
            path: "/api/user",
            host: "d.l",
            port: 80
        };
    }

}

module.exports = config;