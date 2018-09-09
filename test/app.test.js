const databaseConnections = require('../db/database-connection')
const request = require('supertest');
const expect = require('chai').expect

//app.js exports the app
const app = require('../app')

const fixtures = require('./fixtures')



describe('CRUD virusfamilies tests', () => {
    before((done) => {
        // before running we want to run migrations and run seeds
        databaseConnections.migrate.latest()
        .then(() => {
            return databaseConnections.seed.run();
        }).then(() => done())
    });

    it('Lists all Records', (done) => {
        request(app)
            .get('/virusfamilies')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('array');
                expect(response.body).to.deep.equal(fixtures.virusfamilies);
                done();
            });
    });

    it('Lists Records by Id Test 1', (done) => {
        request(app)
            .get('/virusfamilies/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal(fixtures.virusfamilies[0]);
                done();
            });
    });

    it('Lists Records by Id Test 2', (done) => {
        request(app)
            .get('/virusfamilies/6')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal(fixtures.virusfamilies[5]);
                done();
            });
    });

    it('Creates a record', (done) => {
        request(app)
            .post('/virusfamilies')
            .send(fixtures.virusFamily)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                fixtures.virusFamily.id = response.body.id; 
                expect(response.body).to.deep.equal(fixtures.virusFamily);    
            });
            done();
    });
    it('Updates a record', (done) => {
        fixtures.virusFamily.host = 'This is a test'
        request(app)
            .put('/virusfamilies/10')
            .send(fixtures.virusFamily)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal(fixtures.virusFamily);    
            });
            done();
    });
    it('Deletes a record', (done) => {
        request(app)
            .delete('/virusfamilies/3')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal({
                    deleted: true
                });    
            });
            done();
    });

});