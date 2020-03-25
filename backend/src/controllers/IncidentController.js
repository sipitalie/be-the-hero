//const crypto = require('crypto');
const connection = require('../database/connection');

module.exports ={
    //cria a listagen dos incidents(casos)
    async index(request, response){

        const [count] = await connection('incidents').count();
        //console.log(count);
        const { page = 1 } = request.query;
        //limite de amostragem de incidentes por por paginas
        const incidents = await connection('incidents')
            .join('ongs', 'ong_id', '=', 'incidents.ong_id')
            .limit(10)
            .offset((page - 1) * 10)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);
        response.header("X-Total-count", count['count(*)']);
    
        return response.json(incidents);
    },
    //cria os incidents(casos)
    async create(request, response){
        const {title, description, value} =request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
         });
        return response.json({id});
    },
    //apaga um caso 
    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        if(incident.ong_id !== ong_id){
            return response.status(401).json({error: "operacão não autorisada"});
        
        }
        await connection ('incidents').where('id', id).delete();
        return response.status(204).send();

    }
};