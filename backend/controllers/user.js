//importation de bcrypt pour hasher le mot de passe des utilisateurs
const bcrypt = require('bcrypt');

//importation de jsonwebtoken pour attribuer un toket aux utilisation lors de leur connection
const jsonWebToken = require('jsonwebtoken');

//importation du modèle utilisateur
const User = require('../models/User');

//création d'un nouvel utilisateur
exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email : req.body.email,
                password : hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Votre compte à été créé' }))
                .catch(error => res.status(400).json({ error:error }));
        })
        .catch(error => res.status(500).json({ error:error }));
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: 'indentifiant/mot de passe incorrecte' });
            }else{
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: 'indentifiant/mot de passe incorrecte' });
                        } else {
                            console.log({ user })
                            res.status(200).json({
                                userId: user._id,
                                token: jsonWebToken.sign(
                                    { userId : user._id },
                                    process.env.USER_KEY,
                                    { expiresIn : '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error:error }));
            }
        })
        .catch(error => res.status(500).json({ error:error }));
};