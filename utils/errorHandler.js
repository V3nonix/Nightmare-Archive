const path = require('path');
module.exports = function errorHandler(dirname, filename, functionName, error, statusError, res) {
    if (error) {
        console.error(`\x1B[31mError in ${path.basename(dirname)}!!! \u001b[0m| Module: ${path.basename(filename)} | Method: ${functionName} | \x1B[31m${error}!`);
    }
    if (error && statusError && res) {
        res.status(statusError).json(error);
    }
}