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
                function(error, cliente) {
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
    

    router.get('/clientes/:id', function(req, res) {
                Cliente.findById(req.params.id, function (err, produto) {
                        res.render('produto_detalhes', {
                            'produto':produto
                        });
                });
    });

 };   
