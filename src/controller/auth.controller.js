const axios = require('axios');

const slackSignin = async (req, res) => {
    // slack token from client
    const { code } = req.body;

    // make a get call to get access token
    const resp = await axios.get(`https://slack.com/api/oauth.v2.access?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`);
    const { access_token } = resp.authed_user;

    // use access token to retrieve user information
    const userInfo = await axios.get('https://slack.com/api/users.identity', {
        headers: {
          'Authorization': `token ${access_token}`
        }
      });

    res.json({
        msg: 'Everything is okey',
        token: code,
    });
};

module.exports = {
    slackSignin
}
