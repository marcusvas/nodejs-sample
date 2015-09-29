'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


    var Produto = new Schema({
	    nome: String,
	    descricao: String,
	    valor:Number,
	    ativo: { type: Boolean, 'default' : true },
	    dataCadastro: { type: Date, 'default' : Date.now },
	});

module.exports = mongoose.model('Produto', Produto);

