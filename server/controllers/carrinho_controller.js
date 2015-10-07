'use strict';

module.exports = function ProdutoController(router, passport) {

    var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
        logger = require('../util/logger'),
        async = require('async'),
        _ = require('lodash'),
        Produto = require('../models/produto.js'),
        CarrinhoItem = require('../models/carrinho_item.js'),
        HashMap = require('hashmap'),
        Carrinho = require('../models/carrinho.js');


    
    
    router.get('/carrinho', function(req, res) {
        
        var carrinho = req.session.carrinho;
        if (!carrinho){
            carrinho = new HashMap();
        }else{
            carrinho = new HashMap(carrinho);
        }
         
        res.render('carrinho', {
            'carrinho':carrinho.values(),
            'message':carrinho.values() == 0 ? "seu carrinho esta vazio": ""
        });
               
    });
    
    
    router.get('/carrinho/add/:id', function(req, res) {
        
        logger.info("id:" + req.params.id);
        
        
        Produto.findById(req.params.id, function (err, produto) {
            
            if (!err){
            
                var carrinho = req.session.carrinho;
                
                if (!carrinho){
                    carrinho = new HashMap();
                }else{
                    carrinho = new HashMap(carrinho);
                }
                
                var carrinhoItem = carrinho.get(req.params.id), 
                qtdItens = 0;
                
                if (!carrinhoItem){
                    carrinhoItem = new CarrinhoItem();
                }else{
                    qtdItens = carrinhoItem.qtdItens ;    
                }
            
                carrinhoItem.produto = produto;
                carrinhoItem.qtdItens = (qtdItens +1);
                carrinho.set(req.params.id,carrinhoItem);
                req.session.carrinho = carrinho;
                
                logger.info("values"+ req.session.carrinho.values());
                res.redirect('/carrinho');
                
            }else{
                logger.error(err);
            }
    });
    
     router.get('/carrinho/delete/:id', function(req, res) {
            
            var carrinho = req.session.carrinho;
                    
                    if (!carrinho){
                        carrinho = new HashMap();
                    }else{
                        carrinho = new HashMap(carrinho);
                    }
                    
            carrinho.remove(req.params.id);  
            
            req.session.carrinho = carrinho;
            
             res.redirect('/carrinho');
            
        });
    });
    
    router.post("/carrinho/finalizar",function (req,res){
        
        var carrinho = new Carrinho();
        logger.info("finalizar" + req.session.carrinho);
        var itens = new HashMap(req.session.carrinho).values();
        
       /* async.each(function (){
       async.each(openFiles, function(file, callback) {

  // Perform operation on file here.
  console.log('Processing file ' + file);

  if( file.length > 32 ) {
    console.log('This file name is too long');
    callback('File name too long');
  } else {
    // Do work to process file here
    console.log('File processed');
    callback();
  }
}, function(err){
    // if any of the file processing produced an error, err would equal that error
    if( err ) {
      // One of the iterations produced an error.
      // All processing will now stop.
      console.log('A file failed to process');
    } else {
      console.log('All files have been processed successfully');
    }
});
            
        });*/
        itens.forEach(function(value, key) {
            var item = new CarrinhoItem();
            item.produto = new Produto();
            item.produto._id=value.produto._id;
            item.qtdItens=value.qtdItens;
            logger.info("itens" + item.qtdItens);
            logger.info("produto pedido" + item.produto._id.toString());
            item.save(function(err,_item){
                item._id=_item._id;
                logger.info("item id" + item._id);
                carrinho.itens.push(_item);
                logger.info("itens do carrinho dentro" + carrinho.itens);
            });
            
        });
        logger.info("itens do carrinho" + carrinho.itens);
        carrinho.emailCliente = req.body.email;
        carrinho.save(
                function(error, carrinho) {
                    if (!error){
                       // req.session.carrinho = new HashMap();
                        res.render('carrinho', {
                            'message':'Pedido finalizado com sucesso. O codigo do pedido é ' + carrinho._id.toString()
                        });
                    }
                });
    });
    
     router.get("/carrinhos",function (req,res){
         
         Carrinho.find().populate('itens', 'produto qtdItens').exec(
            function (error, carrinhos){
                if (!error){
                     return res.status(200).json({'pedidos': carrinhos});
                }
            }   
            );
            
     });
         
            
 };   
