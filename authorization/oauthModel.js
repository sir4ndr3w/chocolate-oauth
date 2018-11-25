let db_oauth_user = require('../db/db_oauth_user');
let db_oauth_token = require('../db/db_oauth_token');

module.exports = {
    getClient: function (clientID, clientSecret, callback){

        const client = {
            clientID,
            clientSecret,
            grants: null,
            redirectUris: null
        };

        callback(false, client);
    },
    grantTypeAllowed: function (clientID, grantType, callback) {

        console.log('grantTypeAllowed called and clientID is: ', clientID, ' and grantType is: ', grantType);

        callback(false, true);
    },
    getUser: function (userEmail, userPass, callback){

        console.log('getUser() called and username is: ', userEmail, ' and password is: ', userPass, ' and callback is: ', callback, ' and is db_oauth_user null is: ', db_oauth_user);

        db_oauth_user.getUserByCredentials(userEmail, userPass, callback);
    },
    saveAccessToken: function (accessToken, clientID, expires, user, callback){

        console.log('saveAccessToken() called and accessToken is: ', accessToken, ' and clientID is: ',clientID, ' and user is: ', user, ' and accessTokensDBhelper is: ', db_oauth_token);

        //save the accessToken along with the user.id
        db_oauth_token.saveAccessToken(accessToken, user.id, callback);
    },
    getAccessToken: function (bearerToken, callback) {

        db_oauth_token.getIdFromToken(bearerToken, (userID) => {

            const accessToken = {
                user: {
                    id: userID,
                },
                expires: 6000,
            };

            callback(userID === null, userID == null ? null : accessToken);
        })
    },
};