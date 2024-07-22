const refresh = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(400).json(err);
        }
        const accessToken = jwt.sign({ username: data.username, password: data.password }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '2h'
        })
        return res.status(200).json({ accessToken });
    })

}

module.exports = refresh;