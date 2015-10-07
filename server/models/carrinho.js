'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


    var Carrinho = new Schema({
	    itens: [{ type: Schema.Types.ObjectId, ref: 'CarrinhoItem' }],
	     emailCliente: String,
	});

module.exports = mongoose.model('Carrinho', Carrinho);

