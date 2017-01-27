if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configurateStore.development');
} else {
    module.exports = require('./configurateStore.development');
}