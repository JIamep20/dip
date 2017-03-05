if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configurateStore.production.js');
} else {
    module.exports = require('./configurateStore.production.js');
}