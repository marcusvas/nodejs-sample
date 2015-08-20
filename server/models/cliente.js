'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


    var Cliente = new Schema({
	    nome: String,
	    cpf: String,
	    telefone: String,
	    dataCadastro: { type: Date, 'default' : Date.now },
	});

module.exports = mongoose.model('Cliente', Cliente);

