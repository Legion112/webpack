const path = require('path');

module.exports = {
    "mode": "development", // (or "production")
    entry: './web/assets/js/rep_log.js',
    output: {
        path:  path.resolve(__dirname, 'web', 'build'),
        filename: "rep_log.js"
    }
};