const database = require('../database/connection')

class clienteController {
    novoCliente(request, response){

        const{cpf, nome} = request.body

        console.log(cpf, nome)

        database.insert({cpf, nome}).table("cliente_tb").then(data=>{
console.log(data)
response.json({message:"Cliente criado com sucesso!"})
        }).catch(error=>{
            console.log(error)
        })
    }

    listarClientes(request, response){
        database.select("*").table("cliente_tb").then(clientes=>{
            console.log(clientes)
            response.json(clientes)
        }).catch(error=>{
            console.log(error)
        })
    }
    listarUmCliente(request, response){
        const id = request.params.id;
        database.select("*").table("cliente_tb").where({id:id}).then(cliente=>{
            response.json(cliente)
        }).catch(error=>{
            console.log(error)
        })
    }

    atualizarCliente(request, response){
        const id = request.params.id
        const {cpf, nome} = request.body
        database.where({id:id}).update({cpf:cpf, nome:nome})
        .table("cliente_tb")
        .then(data=>{
            response.json({message:"Cliente atualizado com sucesso"})
        }).catch(error=>{
            response.json(error)
        })
    }

    removerCliente(request,response){
        const id = request.params.id

        database.where({id:id}).del().table("cliente_tb").then(data=>{
            response.json({message:"Cliente removido com sucesso"})
        }).catch(error=>{
            response.json(error)
        })
    }
}

module.exports = new clienteController()