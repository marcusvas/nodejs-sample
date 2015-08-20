'use strict';

module.exports = function ProdutoController(router, passport) {

    var Cliente = require('../models/cliente.js');


    router.post('/clientes', function(req, res) {
        var param = {
            'nome' : req.body.nome,
            'cpf': req.body.cpf
        };

        var _cli = new Cliente(param);
        
        _cli.save(
                function(error, produto) {
                    if (!error){
                        res.redirect('/clientes');
                        //return res.status(200).json({'produto': produto});
                    }
                });
    });


    router.get('/clientes', function(req, res) {
        Cliente.find().exec(
            function (error, clientes){
                if (!error){
                    res.render('clientes', {
                            'clientes':clientes
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

 };   
