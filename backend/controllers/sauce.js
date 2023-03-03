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

//permet de modififer une sauce
exports.modifySauce = (req, res) =>{
    let sauceObject = {};

    if (req.file) {
        Sauce.findOne({_id : req.params.id})
            .then ((sauce) => {
                if (sauce.userId != req.auth.userId) {
                    res.status(401).json({message : 'Action non authorisée'});
                    return;
                }else{
                    const filename = sauce.imageUrl.split('/images/')[1];
                    fs.unlinkSync(`images/${filename}`)
                }
            })
            .catch(error => res.status(500).json({error}));
        sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        };
    } else {
        sauceObject= {...req.body};
    }
    Sauce.updateOne({_id : req.params.id}, {...sauceObject, _id : req.params.id})
        .then(() => res.status(200).json({message : 'Votre sauce à été modifié'}))
        .catch(error => res.status(400).json({error}));
};


//permet de supprimer une sauce
exports.deleteSauce = (req, res) =>{
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message : 'Action non authorisée'});
            }else{
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id : req.params.id})
                    .then(() => {
                        res.status(200).json({message: 'Votre sauce à été supprimé'})
                    })
                    .catch(error => res.status(400).json({error}));
                });
            }
        })
        .catch(error => res.status(500).json({error:error}));
};

