const connection = require('../database/connection');

//criando o login 
 module.exports ={
     async create(request, response){
         //pegar o id que vem do corpo da requisicão
         const {id} = request.body;
         //console.log(id)
         const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();
        if(!ong){
            return response.status(400).json({error: "No ONG found wth this ID"});
        }
        return response.json(ong);
     }
 }