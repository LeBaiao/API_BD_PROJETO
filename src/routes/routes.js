const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteController')
const produtoController = require('../controllers/produtoController')
const pedidoController = require('../controllers/pedidoController')
const pedidoFinalizadoController = require('../controllers/pedidoFinalizadoController')

//rotas de cliente
router.post('/novoCliente', clienteController.novoCliente)
router.get('/clientes', clienteController.listarClientes)
router.get('/cliente/:id', clienteController.listarUmCliente)
router.put('/atualizar/cliente/:id', clienteController.atualizarCliente)
router.delete('/delete/cliente/:id', clienteController.removerCliente)


//rotas de produto
router.post('/novoProduto', produtoController.novoProduto)
router.get('/produtos', produtoController.listarProduto)
router.get('/produto/:id', produtoController.listarUmProduto)
router.put('/atualizar/produto/:id', produtoController.atualizarProduto)
router.delete('/deletar/produto/:id', produtoController.removerProduto)


//rotas de pedido
router.post('/novopedido', pedidoController.novoPedido);
router.get('/pedidos', pedidoController.getPedidos);
router.put('/atualizar/pedido/:id', pedidoController.atualizaPedido);
router.get('/pedido/:id', pedidoController.getPedido);
router.delete('/delete/pedido/:id', pedidoController.removerPedido);

//rotas de pedidos finalizados
router.get('/pedidosfinalizados', pedidoFinalizadoController.listarPedidosFinalizados); 
router.get('/pedidofinalizado/:id', pedidoFinalizadoController.listarUmPedidoFinalizado); //busca pedido por id do pedido
router.get('/pedidofinalizado/cliente/:id', pedidoFinalizadoController.listarPedidoByCliente); //buscar pedido finalizado por cliente
router.post('/novopedidofinalizado', pedidoFinalizadoController.novoPedidoFinalizado);


module.exports = router
