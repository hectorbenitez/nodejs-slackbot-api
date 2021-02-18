

const slackSignin = (req, res) => {
    // slack token from client
    const { id_token } = req.body;

    res.json({
        msg: 'Everything is okey',
        token: id_token,
    });
};

module.exports = {
    slackSignin
}
