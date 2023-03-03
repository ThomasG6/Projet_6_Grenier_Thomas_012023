//importation de mongoose
const mongoose = require ('mongoose');

//création du shéma des sauces
const sauceSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    name : {type: String, require : true, match :[/^([a-zA-Zàâäéèêëïîôöùûüç']{3,20})?([-]{0,1})?([a-zA-Zàâäéèêëïîôöùûüç']{3,20})$/, "Veuillez saisir un nom valide"]},
    manufacturer : {type: String, require : true, match :[/^([a-zA-Zàâäéèêëïîôöùûüç']{3,20})?([-]{0,1})?([a-zA-Zàâäéèêëïîôöùûüç']{3,20})$/, "Veuillez saisir un nom de frabriquant valide"]},
    description : {type: String, require : true},
    mainPepper : {type: String, require : true, match :[/^([a-zA-Zàâäéèêëïîôöùûüç']{3,20})$/, "Veuillez saisir un ingrédient valide"]},
    imageUrl : {type: String, require : true},
    heat : {type: Number, require : true},
    likes : {type: Number, require : true},
    dislikes : {type: Number, require : true},
    usersLiked : {type: [String], require : true},
    usersDisliked : {type: [String], require : true}
});

//exportation du shéma en modèle
module.exports = mongoose.model('Sauce', sauceSchema);