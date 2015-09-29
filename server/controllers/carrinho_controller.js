'use strict';

module.exports = function ProdutoController(router, passport) {

    var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
        logger = require('../util/logger'),
        async = require('async'),
        _ = require('lodash'),
        Produto = require('../models/produto.js'),
        CarrinhoItem = require('../models/carrinho_item.js'),
        Carrinho = require('../models/carrinho.js');


    
    
    router.get('/carrinho', function(req, res) {
        
        var carrinho = req.session.carrinho;
        
         for (var carrinhoItem in carrinho.itens){
                logger.info("produto" + carrinhoItem.produto);
         }
            res.render('carrinho', {
                    'carrinho':carrinho
            });
               
    });
    
    
    router.get('/carrinho/add/:id', function(req, res) {
        
                Produto.findById(req.params.id, function (err, produto) {
                    
                    var carrinho = req.session.carrinho;
            
                    if (!carrinho){
                        carrinho = new Carrinho();
                    }
                    
                    var carrinhoItem = new CarrinhoItem();
                
                    carrinhoItem.produto = produto;
                    carrinhoItem.qtdItens = 20;
                    
                    logger.info("nome:"+ carrinhoItem.produto.nome);
                    
                    carrinho.itens.push(carrinhoItem);
                    
                    req.session.carrinho = carrinho;
                    
                    res.redirect('/carrinho');
            });
        
    
               
    });
   
    
  

 };   
