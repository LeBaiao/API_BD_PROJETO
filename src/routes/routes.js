const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteController')

router.post('/novoCliente', clienteController.novoCliente)
router.get('/clientes', clienteController.listarClientes)
router.get('/cliente/:id', clienteController.listarUmCliente)
router.put('/atualizar/cliente/:id', clienteController.atualizarCliente)
router.delete('/delete/cliente/:id', clienteController.removerCliente)

module.exports = router
