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

class loginController{
    async validarLogin(req, res) {
        const { email, senha } = req.body;
        try {
          const result = await knex.raw('CALL validar_login(?, ?)', [email, senha]);
          const data = result[0][0]; // Obtém a primeira linha de resultado da tabela de mensagem
          res.status(200).json(data);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Ocorreu um erro ao validar o login.' });
        }
      }

      
      
      
      
    
      

}
module.exports = new loginController()