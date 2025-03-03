
module.exports = {
    createUser: async (req, res) => {
        const { name, email, password } = req.body;

        res.status(201).json({
            ok: true,
            msg: 'register',
            user: { name, email, password }
        });
    },
    login: (req, res) => {
        const { email, password } = req.body;
        res.json({
            ok: true,
            msg: 'login',
            user: { email, password }
        });
    },
    renewToken: (req, res) => {
        res.json({
            ok: true,
            msg: 'renew'
        });
    }
}