process.env.NODE_ENV = 'test';

const chai = require('chai');
const request = require('supertest');
const app = require('../app/app');

// const chai = require('chai');
// const request = require('supertest');
// const app = require('../app');
// const connection = require('../db/connection');
// const expect = chai.expect;
// chai.use(require('chai-sorted'));

describe('homepage', () => {

    describe('/api', () => {
        
        describe('/topics', () => {

            it('(GET // 200) serves up an array of topic objects, each with specific keys of SLUG and DESCRIPTION', () => {
                return request(app)
                .get('/api/topics')
                .expect(200)
                .then((response) => {
                    const randomIndex = Math.floor(Math.random() * response.body.topics.length);
                    expect(response.body.topics).to.be.an('array');
                    expect(response.body.topics[randomIndex]).to.be.an('object');
                    expect(response.body.topics[randomIndex]).to.have.all.keys('slug', 'description');
                });
            });

        });

    });

});
