'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


    var CarrinhoItem = new Schema({
	    produto: { type: Schema.Types.ObjectId, ref: 'Produto' },
	    qtdItens : Number
	});

module.exports = mongoose.model('CarrinhoItem', CarrinhoItem);