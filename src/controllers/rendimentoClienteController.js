const database = require('../database/connection')
var knex = require('knex')({
    client:'mysql2',
    connection:{
        host:'localhost',
        user:'root',
        password:"1234",
        database:'letriz_bd'
    }
});

//retorna o valor gasto total do cliente em nosso site, buscando por id e usando uma function do banco de dados
class rendimentoClienteController {
    async rendimentoCliente(req, res) {
      const { id } = req.params;
      try {
        const result = await knex.raw(`SELECT sp_rendimento_cliente(${id}) AS total_gasto`);
        const data = result[0][0];
        res.status(200).json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu uma falha ao processar o cliente' });
      }
    }


    //função para retornar todos os clientes da loja em odem do que mais gastou na loja para o com menor gasto
    async rendimentoClientes(req, res) {
        try {
          const result = await knex('cliente_tb')
            .select('cliente_tb.id AS cliente_id', 'cliente_tb.nome', knex.raw('SUM(pedido_finalizado_tb.valor_total) AS total_gasto'))
            .leftJoin('pedido_tb', 'cliente_tb.id', 'pedido_tb.id_cliente')
            .leftJoin('pedido_finalizado_tb', 'pedido_tb.id', 'pedido_finalizado_tb.id_pedido')
            .groupBy('cliente_tb.id', 'cliente_tb.nome')
            .orderByRaw('SUM(pedido_finalizado_tb.valor_total) DESC');
          res.status(200).json(result);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Ocorreu uma falha ao processar a lista de clientes' });
        }
      }
      
      



  }
  
module.exports = new rendimentoClienteController()