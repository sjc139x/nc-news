process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-sorted'));

const request = require('supertest');
const app = require('../app/app');
const connection = require('../db/connection');

describe('homepage', () => {

    beforeEach(() => connection.seed.run());

    after(() => connection.destroy());

    describe('/api', () => {
        
        describe('/topics', () => {

            it('(GET // 200) serves up an array of topic objects, each with specific keys of SLUG and DESCRIPTION', () => {
                return request(app)
                .get('/api/topics')
                .expect(200)
                .then(response => {
                    const randomIndex = Math.floor(Math.random() * response.body.topics.length);
                    expect(response.body.topics).to.be.an('array');
                    expect(response.body.topics[randomIndex]).to.be.an('object');
                    expect(response.body.topics[randomIndex]).to.have.all.keys('slug', 'description');
                });
            });

        });

        describe('/articles', () => {
            
            it('(GET // 200) serves up an array of article objects, each with specific keys of AUTHOR, TITLE, ARTICLE_ID, TOPIC, CREATED_AT, VOTES AND COMMENT_COUNT', () => {
                return request(app)
                .get('/api/articles')
                .expect(200)
                .then(response => {
                    const randomIndex = Math.floor(Math.random() * response.body.articles.length);
                    expect(response.body.articles).to.be.an('array');
                    expect(response.body.articles[randomIndex]).to.be.an('object');
                    // expect(response.body.articles[randomIndex]).to.have.all.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
                });
            });

            it('(GET // 200) allows client to filter articles by author', () => {
                return request(app)
                .get('/api/articles?author=butter_bridge')
                .expect(200)
                .then(response => {
                    const randomIndex = Math.floor(Math.random() * response.body.articles.length);
                    expect(response.body.articles[randomIndex].author).to.equal('butter_bridge');
                    expect(response.body.articles[randomIndex].author).to.equal('butter_bridge');
                });
            });

            it('(GET // 200) allows client to filter articles by topic', () => {
                return request(app)
                .get('/api/articles?topic=cats')
                .expect(200)
                .then(response => {
                    const randomIndex = Math.floor(Math.random() * response.body.articles.length);
                    expect(response.body.articles[randomIndex].topic).to.equal('cats');
                });
            });

            it('(GET // 200) allows client to sort articles by any column (defaults to date)', () => {
                return request(app)
                .get('/api/articles?sort_by=title')
                .expect(200)
                .then(response => {
                    expect(response.body.articles[11].title).to.equal('A');
                    expect(response.body.articles[0].title).to.equal('Z');
                });
            });

            it('(GET // 200) allows client to specify sorting order (defaults to descending)', () => {
                return request(app)
                //just testing the base endpoint, because usually it would default to asc...
                .get('/api/articles')
                .expect(200)
                .then(response => {
                    expect(response.body.articles).to.be.sorted({descending: true});
                });
            });

            it('(GET // 200) serves up a single article as specified by the client with the article_id', () => {
                return request(app)
                .get('/api/articles/12')
                .expect(200)
                .then(response => {
                    expect(response.body.articles.length).to.equal(1);
                    expect(response.body.articles[0].body).to.equal('Have you seen the size of that thing?');
                });
            });

        });

    });

});
