const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteController')
const produtoController = require('../controllers/produtoController')

router.post('/novoCliente', clienteController.novoCliente)
router.post('/novoProduto', produtoController.novoProduto)

module.exports = router
