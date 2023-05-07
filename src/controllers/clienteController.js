const database = require('../database/connection')

class clienteController {
    novoCliente(request, response){

        const{cpf, nome, email, senha, endereco} = request.body

        console.log(cpf, nome)

        database.insert({cpf, nome, email, senha, endereco}).table("cliente_tb").then(data=>{
console.log(data)
response.json({message:"Cliente criado com sucesso!"})
        }).catch(error=>{
            console.log(error)
        })
    }
//Só pra não mostrar a senha do usuário
    listarClientes(request, response){
        database.select("id, cpf, nome, email, endereco").table("cliente_tb").then(clientes=>{
            console.log(clientes)
            response.json(clientes)
        }).catch(error=>{
            console.log(error)
        })
    }
    listarUmCliente(request, response){
        const id = request.params.id;
        database.select("id, cpf, nome, email, endereco").table("cliente_tb").where({id:id}).then(cliente=>{
            response.json(cliente)
        }).catch(error=>{
            console.log(error)
        })
    }

    atualizarCliente(request, response){
        const id = request.params.id
        const {cpf, nome, email, senha, endereco} = request.body
        database.where({id:id}).update({cpf:cpf, nome:nome, email:email, senha:senha, endereco:endereco})
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