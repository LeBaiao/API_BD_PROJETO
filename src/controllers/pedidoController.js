const database = require('../database/connection')

class pedidoController{
    novoPedido(request,response){
        const {id, num_item, id_produto, id_cliente} = request.body;

        database('cliente_tb').select('id').where({id: id_cliente}).first()
        .then((result) => {
            if (!result) {
                throw new Error('Cliente não encontrado :(');
            }
        })
        .then(()=>{
            return database('produto_tb').select('id').where({id: id_produto}).first();
        })
        .then((result) => {
            if (!result){
                throw new Error('Produto não encontrado :(');
            }
            return database('pedido_tb').insert({
                num_item : num_item,
                id_cliente : id_cliente,
                id_produto : id_produto
            });
        })
        .then(()=> {
            response.json({message: "Pedido criado com sucesso!"});
        })
        .catch((error) =>{
            console.log(error);
            response.status(500).json({message: "Ocorreu um erro ao criar o pedido"});
        });
    }
}

module.exports = new pedidoController()