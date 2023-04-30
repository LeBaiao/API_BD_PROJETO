const database = require('../database/connection')

class produtoController {
    novoProduto(request, response){

        const{nome, editora, preco, estoque} = request.body

        console.log(nome, editora, preco, estoque)

        database.insert({nome, editora, preco, estoque}).table("produto_tb").then(data=>{
            console.log(data)
            response.json({message:"Produto inserido com sucesso!"})
        }).catch(error=>{
            console.log(error)
        })
    }
}

module.exports = new produtoController()