//importation de mongoose
const mongoose = require ('mongoose');

//ajout du plugin d'email unique
const uniqueValidator = require ('mongoose-unique-validator');

//création du shéma utilisateur
const userSchema = new mongoose.Schema({
    email :  {type : String, required : true, unique: true, match : [/^[\w-\.]+@([\w-]+\.)+[\w]{2,}$/, "Veuillez saisir une email valide"]},
    password : {type: String, required : true}
});

//application du plugin au schéma pour en faire un unique 
userSchema.plugin(uniqueValidator);

//exportation du schéma en modèle
module.exports = mongoose.model('User', userSchema);