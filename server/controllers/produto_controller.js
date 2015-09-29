'use strict';

module.exports = function ProdutoController(router, passport) {

    var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
        logger = require('../util/logger'),
        async = require('async'),
        _ = require('lodash'),
        Produto = require('../models/produto.js');


    router.post('/produtos', function(req, res) {
        logger.info("descricao" + req.body.descricao);
        var param = {
            'nome' : req.body.nome,
            'descricao': req.body.descricao
        };

        var produto = new Produto(param);
        
        var _id = req.body.id;
        
        if (!_id){
            //cria um novo produto
            produto.save(
                function(error, produto) {
                    if (!error){
                        res.redirect('/produtos');
                        //return res.status(200).json({'produto': produto});
                    }
                });
        }
        else{
            //atualiza um produto
            logger.info(req.body.id);
            var query = {'_id':_id};
            produto._id=_id;
            Produto.findOneAndUpdate(query, produto, {upsert:false}).exec(
            function(error, produto) {
                    if (!error){
                        res.redirect('/produtos');
                    }else{
                        throw error;
                        
                    }
                });
        }
        
        
       
    });


    router.get('/produtos', function(req, res) {
        Produto.find().exec(
            function (error, produtos){
                if (!error){
                    res.render('produtos', {
                            'produtos':produtos
                        });
                }
            }   
            );
       
    });
    

    router.get('/produtos/:id', function(req, res) {
                Produto.findById(req.params.id, function (err, produto) {
                        res.render('produto_detalhes', {
                            'produto':produto
                        });
                });
    });
    
    router.get('/produtos/:id/edit', function(req, res) {
                Produto.findById(req.params.id, function (err, produto) {
                        res.render('produto_form', {
                            'produto':produto
                        });
                });
    });

 };   
