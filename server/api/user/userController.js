const User = require('../../models/User');
const router = require('express').Router();

router.post('/', function (req, res, next) {
    const { body } = req;
    let { email } = body;
    const {
        name,
        password
    } = body;

    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }
    if (!name) {
        return res.send({
            success: false,
            message: 'Error: name cannot be blank.'
        });
    }

    email = email.toLowerCase();

    User.find({
        email: email
    }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        } else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Account already exist.'
            });
        }

        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.name = name;
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error.'
                });
            }
            return res.send({
                success: true,
                message: 'Created New User.',
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name
                }
            });
        });
    });
});

module.exports = router;