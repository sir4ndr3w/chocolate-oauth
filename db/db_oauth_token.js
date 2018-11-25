const pool = require('./connection');

module.exports = {
    saveAccessToken: function (userID, token, callback) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query( "UPDATE oauth_tokens SET access_token = "+ connection.escape(token) +" WHERE id = " + connection.escape(userID), (err, result) => {
                connection.release();
                if (err) callback(err, null);

                callback(null, result);
            });
        });
    },
    getIdFromToken: function (token, callback) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query("SELECT id FROM oauth_tokens WHERE access_token = " + connection.escape(token), (err, result) => {
                let foundID = false;
                if (!(result.length === 0 && result === null)) {
                    foundID = true;
                }
                connection.release();
                if(err) callback(err, null);

                callback(null, foundID ? result[0]['id'] : null);
            });
        });
    },
};