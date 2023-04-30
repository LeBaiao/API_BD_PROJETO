const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteController')

router.post('/novoCliente', clienteController.novoCliente)

module.exports = router
