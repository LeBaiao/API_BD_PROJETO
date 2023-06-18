const database = require('../database/connection')

class produtoController {

    //essa função verifica se existe alguma mensagem de erro configurada (no caso a trigger), se tiver, retorna a mensagem 
    async novoProduto(request, response) {
        const { nome, editora, preco, estoque } = request.body;
      
        try {
          const result = await database
            .insert({ nome, editora, preco, estoque })
            .table('produto_tb');
      
          console.log(result);
      
          // Verifica se o resultado possui uma propriedade "message" definida
          if (result && result.message) {
            response.json({ message: result.message });
          } else {
            response.json({ message: 'Produto inserido com sucesso!' });
          }
        } catch (error) {
          console.error(error);
      
          // Verifica se o erro possui uma propriedade "message" definida
          if (error && error.message) {
            response.status(500).json({ error: error.message });
          } else {
            response.status(500).json({ error: 'Ocorreu uma falha ao inserir o produto' });
          }
        }
      }
      

    listarProduto(request, response){
        database.select("*").from("produto_tb").then(produtos=>{
           console.log(produtos)
           response.json(produtos) 
        }).catch(error=>{
            console.log(error)
        })
    }

    listarUmProduto(request, response){
        const id = request.params.id

        database.select("*").from("produto_tb").where({id:id}).then(produto=>{
           response.json(produto) 
        }).catch(error=>{
            console.log(error)
        })
    }

    atualizarProduto(request, response){
        const id = request.params.id
        const {nome, editora, preco, estoque} = request.body

        database.where({id:id}).update({nome, editora, preco, estoque}).table("produto_tb").then(data=>{
            response.json({message:"Produto atualizado com sucesso!"})
        }).catch(error=>{
            response.json(error)
        })
    }

    removerProduto(request, response){
        const id = request.params.id
        
        database.where({id:id}).del().table("produto_tb").then(data=>{
            response.json({message:"Produto removido com sucesso!"})
        }).catch(error=>{
            response.json(error)
        })
    }
}

module.exports = new produtoController()