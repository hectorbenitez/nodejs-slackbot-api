

const slackSignin = (req, res) => {
    // slack token from client
    const { code } = req.body;

   

    res.json({
        msg: 'Everything is okey',
        token: id_token,
    });
};

module.exports = {
    slackSignin
}
