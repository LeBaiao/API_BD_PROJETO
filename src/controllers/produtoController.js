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