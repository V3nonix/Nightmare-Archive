

async function create(req, res) {
    try {

    } catch (err) {
        errorHandler(__dirname, __filename, 'create', err, 500, res);
    }
}

module.exports = {
    create,
};