const db_user = require('../db/db_oauth_user');

module.exports = {
    registerUser: function (req, res){

        console.log(`authRoutesMethods: registerUser: req.body is:`, req.body);

        //query db to see if the user exists already
        db_user.doesUserExist(req.body.username, (sqlError, doesUserExist) => {

            //check if the user exists
            if (sqlError !== null || doesUserExist) {

                db_user.insertUserInDB(req.body.username, req.body.passwort, () => {

                    //message to give summary to client
                    const message = sqlError !== null ? "Operation unsuccessful" : "User already exists";

                    //detailed error message from callback
                    const error = sqlError !== null ? sqlError : "User already exists";

                    sendResponse(res, message, sqlError);
                });
            }
        });
    },
    login: function(req, res){

    }
};

function sendResponse(res, message, error) {

    res
        .status(error !== null ? error !== null ? 400 : 200 : 400)
        .json({
            'message': message,
            'error': error,
        })
}