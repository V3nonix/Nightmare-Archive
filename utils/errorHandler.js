// Imports:
const path = require('path');
// Error handling:
module.exports = function errorHandler(dirname, filename, functionName, error, statusError, res) {
    if (error) {
        // Error catch (Backend):
        console.error(`\x1B[31mError in ${path.basename(dirname)}!!! \u001b[0m| Module: ${path.basename(filename)} | Method: ${functionName} | \x1B[31m${error}!`);
    }
    if (error && statusError && res) {
        // Error catch (Frontend):
        res.status(statusError).json(error);
    }
}

/* INPUTS */
    // dirname = __dirname
    // filename = __filename
    // functionName = 'The name of the parent function you call this module in, or whatever else you want, as a string.'
    // error = 'The error object received by a catch block or saved to a variable like "const err = new Error('Error!');"'
    // statusError = 'A number for the status error you wish to send to the front end, like 400, 500 ect...'
    // res = 'The response object passed as an argument in any function that receives one.' 

// EXAMPLE USAGE: 
/*

    // Requires errorHandler:
    const errorHandler = require('<ERROR HANDLER FILE PATH HERE>');

    ... 

    async function login(req, res) {
        try {

            ... TRY BLOCK ...

        } catch (err) {
            // Error handler:
            errorHandler(__dirname, __filename, 'login', err, 500, res);
        }
    }

*/