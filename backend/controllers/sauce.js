//on récupère le modèle sauce
const Sauce = require('../models/Sauce');

//on récupère le module fs qui permet de gérer les midification d'images
const fs = require('fs');

//permet de créer une nouvelle sauce
exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        name : sauceObject.name,
        manufacturer : sauceObject.manufacturer,
        description : sauceObject.description,
        mainPepper : sauceObject.mainPepper,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        heat : sauceObject.heat,
        likes : sauceObject.likes,
        dislikes : sauceObject.dislikes,
        usersLiked : sauceObject.usersLiked,
        usersDisliked : sauceObject.usersDisliked,
        userId: req.auth.userId
    })
    sauce.save()
        .then(() => res.status(201).json({message: 'Votre sauce à été enregistré'}))
        .catch(error => res.status(400).json({error:error}));
};

