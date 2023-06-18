const database = require('../database/connection')

class pedidoController{

    //post funcionando certinho
        novoPedido(request, response) {
        const { id_cliente, itens } = request.body;
      
        // Insere dados na tabela pedido_tb
        database
          .insert({ id_cliente })
          .table("pedido_tb")
          .then(pedidoData => {
            const id_pedido = pedidoData[0];
      
            // Insere dados na tabela item_pedido_tb
            const itemsData = itens.map((item, index) => ({
              id_pedido,
              num_item: index + 1,
              id_produto: item.id_produto,
              quantidade: item.quantidade,
            }));
      
            return database
              .insert(itemsData)
              .table("item_pedido_tb");
          })
          .then(() => {
            response.json({ message: "Pedido criado com sucesso!" });
          })
          .catch(error => {
            console.log(error);
            response.status(500).json({ message: "Erro ao criar pedido" });
          });
      }

      //put funcionando certinho
       atualizaPedido (request, response) {
        const id  = request.params.id;
        const { id_cliente, itens } = request.body;
      
        // Atualiza os dados do pedido
        database('pedido_tb')
          .where({ id })
          .update({ id_cliente })
          .then(() => {
            // Remove os itens antigos do pedido
            return database('item_pedido_tb')
              .where({ id_pedido: id })
              .del();
          })
          .then(() => {
            // Insere os novos itens do pedido
            const itemsData = itens.map((item, index) => ({
              id_pedido: id,
              num_item: index + 1,
              id_produto: item.id_produto,
              quantidade: item.quantidade,
            }));
      
            return database
              .insert(itemsData)
              .table('item_pedido_tb');
          })
          .then(() => {
            response.status(200).json({ message: 'Pedido atualizado com sucesso!' })
          })
          .catch(error => {
            console.log(error);
            response.status(500).json({ message: 'Erro ao atualizar pedido' })
          });
      }


//get ta funcionando certinho
       getPedidos(request, response) {
        database.select('*').from('pedido_tb')
          .then(pedidos => {
            const promises = pedidos.map(pedido => {
              return database.select('*').from('item_pedido_tb').where({id_pedido: pedido.id})
                .then(itensPedido => {
                  pedido.itens = itensPedido;
                  return pedido;
                })
            });
            return Promise.all(promises);
          })
          .then(pedidos => {
            response.json(pedidos);
          })
          .catch(error => {
            console.log(error);
            response.status(500).json({message: 'Erro ao obter pedidos'});
          });
      }
      
      //pega só 1 pedido pelo id
      //funcionando tbm
      async  getPedido(request, response) {
        const id = request.params.id;
      
        try {
          const pedido = await database.select('*').from('pedido_tb').where({ id: id });
      
          if (pedido.length > 0) {
            const promises = pedido.map(async (pedido) => {
              const itensPedido = await database
                .select('item_pedido_tb.*', 'produto_tb.preco')
                .from('item_pedido_tb')
                .innerJoin('produto_tb', 'item_pedido_tb.id_produto', 'produto_tb.id')
                .where({ id_pedido: pedido.id });
      
              const valorTotal = itensPedido.reduce((total, item) => {
                return total + item.quantidade * item.preco;
              }, 0);
      
              pedido.itens = itensPedido;
              pedido.valor_total = valorTotal;
      
              return pedido;
            });
      
            const pedidosComTotal = await Promise.all(promises);
            response.json(pedidosComTotal[0]);
          } else {
            throw new Error('Pedido não encontrado');
          }
        } catch (error) {
          console.error(error);
          response.status(500).json({ message: 'Erro ao obter pedido' });
        }
      }
      
      
    
    //delete funcionando certinho
    removerPedido(request, response) {
        const id = request.params.id;
      
        database.transaction(trx => {
          trx('item_pedido_tb')
            .where({ id_pedido: id })
            .del()
            .then(() => {
              return trx('pedido_tb')
                .where({ id: id })
                .del();
            })
            .then(() => {
              response.json({ message: `Pedido ${id} excluído com sucesso!` });
            })
            .catch((error) => {
              console.log(error);
              response.status(500).json({ message: 'Erro ao excluir pedido' });
            });
        });
      }
      
      
      
      


      
    }

module.exports = new pedidoController()