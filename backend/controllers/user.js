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

