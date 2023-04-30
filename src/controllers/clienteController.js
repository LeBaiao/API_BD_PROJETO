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
}

module.exports = new clienteController()