const { WebClient } = require('@slack/web-api');
const { generateJWT } = require('../helpers/generateJWT');
const axios = require('axios');

const clientId = process.env.SLACK_CLIENT_ID;
const clientSecret = process.env.SLACK_CLIENT_SECRET;

const slackSignin = async (req, res) => {
    // slack token from client
    const { code } = req.body;
    // Create a client instance just to make this single call, and use it for the exchange
    try {
        const result = await (new WebClient()).oauth.v2.access({
            client_id: clientId,
            client_secret: clientSecret,
            code
          });
        // request user info with token to slack api
        const userInfo = await axios.get('https://slack.com/api/users.identity', {
            headers: {
              "Authorization": `Bearer ${result.authed_user.access_token}`
            }
          });

        const { name, id } = userInfo.data.user;
        const token = await generateJWT(id);

        res.json({
            name,
            id,
            token
        });
    }catch(error){
        console.log(error);
    }    
};

module.exports = {
    slackSignin
};
