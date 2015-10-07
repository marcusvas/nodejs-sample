'use strict';

module.exports = function ProdutoController(router, passport) {

    var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
        logger = require('../util/logger'),
        async = require('async'),
        _ = require('lodash'),
        Produto = require('../models/produto.js');
        
    var Authorization = require('../util/authorization');


    router.post('/produtos', function(req, res) {
        logger.info("descricao" + req.body.descricao);
        var param = {
            'nome' : req.body.nome,
            'descricao': req.body.descricao,
                 'valor': req.body.valor
        };

        var produto = new Produto(param);
        
        var _id = req.body.id;
        
        if (!_id){
            //cria um novo produto
            produto.ativo=true;
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

    router.get('/produtos', Authorization.isAuthenticated, function(req, res) {
        
        var params = {
               conditions: {
                   ativo: true
               }
           };
           
        Produto.find({ativo:true}).exec(
            function (error, produtos){
                if (!error){
                    res.render('produtos', {
                            'produtos':produtos
                        });
                }
            }   
            );
       
    });

    router.get('/', function(req, res) {
        
        var params = {
               conditions: {
                   ativo: true
               }
           };
           
        Produto.find({ativo:true}).exec(
            function (error, produtos){
                if (!error){
                    res.render('index', {
                            'produtos':produtos
                        });
                }
            }   
            );
       
    });
    
   
    router.get('/aboutus', function(req, res) {
        res.render('aboutus');
    });
    
    
    router.get('/produtos/new', function(req, res) {
        res.render('produto_form');
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
    
    router.get('/produtos/:id/delete', function(req, res) {
            var _id = req.params.id;
            logger.info(req.body.id);
             var produto = new Produto();
            var query = {'_id':_id};
            produto._id=_id;
            produto.ativo = false;
            Produto.findOneAndUpdate(query, produto, {upsert:false}).exec(
            function(error, produto) {
                    if (!error){
                        res.redirect('/produtos');
                    }else{
                        throw error;
                        
                    }
                });
    });
    
  

 };   
