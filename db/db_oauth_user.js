const pool = require('./connection');

module.exports = {
    getUserByCredentials: function (userEmail, userPass, callback) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('SELECT * FROM oauth_user WHERE user_email = ' + connection.escape(userEmail) + ' AND user_password = ' + connection.escape(userPass), (err, result) => {

                connection.release();
                if (err) callback(err, null);

                callback(false, result !== null && result.length  === 1 ?  result[0] : null)
            });
        });
    },
    insertUserInDB: function(userEmail, userPass, callback) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query("INSERT INTO oauth_user (id, user_email, user_password) VALUES ('', "+ connection.escape(userEmail.toLowerCase()) +", "+connection.escape(userPass) +")) ", (err, result) => {

                connection.release();
                if (err) callback(err, false);

                callback(null, true);
            });
        });
    },
    doesUserExist: function(userEmail, callback) {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query("SELECT * FROM oauth_user WHERE user_email = " + connection.escape(userEmail), (err, result) => {
                connection.release();
                if (err) callback (err, null);
                callback(null, result[0].length !== 0 && result[0] !== null);
            });
        });
    }
};