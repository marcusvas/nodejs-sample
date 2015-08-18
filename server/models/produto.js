'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


    var Produto = new Schema({
	    nome: String,
	    descricao: String,
	    dataCadastro: { type: Date, 'default' : Date.now },
	});

module.exports = mongoose.model('Produto', Produto);

