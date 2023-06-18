//Para a tabela de pedidos finalizados só será possível utilizar os métodos POST e GET
const database = require('../database/connection')


class pedidoFinalizadoController {

      listarPedidosFinalizados(request, response) {
        database
          .select(
            'pedido_finalizado_tb.id_pedido',  
            'pedido_finalizado_tb.data_pedido',
            'pedido_finalizado_tb.valor_total',
            'cliente_tb.id',
            'cliente_tb.nome',
            'cliente_tb.endereco',
            'pedido_finalizado_tb.forma_pagamento'
          )
          .from('cliente_tb')
          .join('pedido_tb', 'cliente_tb.id', '=', 'pedido_tb.id_cliente')  //faz o join com pedido_tb e cliente_tb para pegar os dados do cliente
          .join('pedido_finalizado_tb', 'pedido_tb.id', '=', 'pedido_finalizado_tb.id_pedido')
          .orderBy('pedido_finalizado_tb.id_pedido') // Ordena os resultados pelo ID do pedido
          .then(pedidos => {
            const pedidosSeparados = {};
            pedidos.forEach(pedido => {  //percorrendo o array de pedidos e organizando-os em um objeto pedidosSeparados com base no campo id_pedido.
              const idPedido = pedido.id_pedido;
              if (!pedidosSeparados[idPedido]) {
                pedidosSeparados[idPedido] = {
                  id_pedido: pedido.id_pedido,
                  data_pedido: pedido.data_pedido,
                  valor_total: pedido.valor_total,
                  forma_pagamento: pedido.forma_pagamento,
                  cliente: {  //formatação do json
                    id: pedido.id,
                    nome: pedido.nome,
                    endereco: pedido.endereco
                  }
                 
                };
              }
            });
      
            const resultado = Object.values(pedidosSeparados);
            response.json(resultado);
          })
          .catch(error => {
            console.log(error);
            response.status(500).json({ error: 'Ocorreu um erro ao listar os pedidos finalizados' });
          });
      }
      

//funcionando
listarUmPedidoFinalizado(request, response) {
    const id = request.params.id;
    database
      .select(
        'pedido_finalizado_tb.id_pedido',
        'pedido_finalizado_tb.data_pedido',
        'pedido_finalizado_tb.valor_total',
        'cliente_tb.id',
        'cliente_tb.nome',
        'cliente_tb.endereco',
        'pedido_finalizado_tb.forma_pagamento'
      )
      .from('cliente_tb')
      .join('pedido_tb', 'cliente_tb.id', '=', 'pedido_tb.id_cliente')
      .join('pedido_finalizado_tb', 'pedido_tb.id', '=', 'pedido_finalizado_tb.id_pedido')
      .where('pedido_finalizado_tb.id_pedido', id)
      .then(cliente => {
        response.json(cliente);
      })
      .catch(error => {
        console.log(error);
      });
  }

  //funcionando
  listarPedidoByCliente(request, response) {
    const id = request.params.id;
    database
      .select(
        'pedido_finalizado_tb.id_pedido',
        'pedido_finalizado_tb.data_pedido',
        'pedido_finalizado_tb.valor_total',
        'cliente_tb.id',
        'cliente_tb.nome',
        'cliente_tb.endereco',
        'pedido_finalizado_tb.forma_pagamento'
      )
      .from('cliente_tb')
      .join('pedido_tb', 'cliente_tb.id', '=', 'pedido_tb.id_cliente')
      .join('pedido_finalizado_tb', 'pedido_tb.id', '=', 'pedido_finalizado_tb.id_pedido')
      .where('pedido_tb.id_cliente', id )
      .then(cliente => {
        response.json(cliente);
      })
      .catch(error => {
        console.log(error);
      });
  }

  //funcionando
   novoPedidoFinalizado = (req, res) => {
    const { id_pedido, data_pedido, valor_total, forma_pagamento } = req.body;
  
    database('pedido_finalizado_tb')
      .insert({ id_pedido, data_pedido, valor_total, forma_pagamento })
      .then(() => {
        res.json({ message: 'Pedido finalizado com sucesso!' });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Ocorreu um erro ao finalizar o pedido.' });
      });
  };



}
module.exports = new pedidoFinalizadoController()