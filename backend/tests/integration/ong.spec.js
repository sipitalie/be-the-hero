const request = require('supertest');
const app =require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', ()=>{
    beforeEach(async ()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async() => {
       await connection.destroy();
    });


    it('should be table to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name :"APAD",
                email :"sipitali@gmail.com",
                whatsapp :"923625274",
                city :"lobido",
                uf :"sp"     
            });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});