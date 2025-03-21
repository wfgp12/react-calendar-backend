const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jtw");

module.exports = {
    createUser: async (req, res) => {
        const { name, email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                    ok: false,
                    msg: 'User already exists'
                });
            }

            user = new User({ name, email, password });

            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(password, salt);

            await user.save();

            const token = await generateJWT(user._id, user.name);

            res.status(201).json({
                ok: true,
                msg: 'User was created',
                token,
                user: {
                    uid: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok: false,
                msg: 'Error creating user',
            });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User or password is incorrect'
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'User or password is incorrect'
            });
        }

        const token = await generateJWT(user._id, user.name);
        
        res.json({
            ok: true,
            token,
            user: {
                uid: user._id,
                name: user.name,
                email: user.email
            }
        });
    },
    renewToken: async(req, res) => {
        const { uid, name } = req.user;

        let user = await User.findById(uid);

        const token = await generateJWT(uid, name);
        res.json({
            ok: true,
            token,
            user: {
                uid,
                name,
                email: user.email
            }
        });
    }
}