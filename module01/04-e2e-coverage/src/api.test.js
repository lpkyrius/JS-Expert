const { describe, it, after, before } = require('mocha');
const supertest = require('supertest');
const assert = require('assert');

describe('API Suite test', () => {
    let app;
    before((done) => {
        app = require('./api');
        app.once('listening', done);
    })
    
    after(done => app.close(done));
    
    describe('/contact:get', () => {
        it('should request the contact route and return HTTP status 200', async () => {
            const response = await supertest(app)
                .get('/contact')
                .expect(200)

            assert.strictEqual(response.text, 'contact us page')
        })
    })

    describe('/login:post', () => {
        it('should request the login route and return HTTP status 200', async () => {
            const response = await supertest(app)
                .post('/login')
                .send( {username:"leandropassos",password: "S3cr&t"} )
                .expect(200)

            assert.strictEqual(response.text, 'Log in succeeded!')
        })
    })

    describe('/login:post', () => {
        it('should request the login route and return HTTP status 401', async () => {
            const response = await supertest(app)
                .post('/login')
                .send( {username:"someoneelse",password: "f@k3pwd"} )
                .expect(401)
                
            assert.ok(response.unauthorized)
            assert.strictEqual(response.text, 'Log in failed!')
        })
    })

    // After using istanbuljs/nyc, npm run test:cov pointed the lines we had not tested yet
    describe('/hi:get - 404', () => {
        it('should request an exist route and return HTTP status 404', async () => {
            const response = await supertest(app)
                .post('/hi')
                .expect(404)
                
            assert.strictEqual(response.text, 'not found!')
        })
    })
})