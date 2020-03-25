const connection = require('../database/connection');
//criar perfil das ongs 
module.exports = {
    //listar todos os incidents(casos) de uma ong
    async index (request, response){
        const ong_id = request.headers.authorization;
        const incidents = await connection( 'incidents')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidents);

    }
}