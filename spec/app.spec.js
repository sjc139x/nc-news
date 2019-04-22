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
            
            it('(GET // 200) serves up an array of article objects, each with specific keys of AUTHOR, TITLE, ARTICLE_ID, TOPIC, CREATED_AT, VOTES and COMMENT_COUNT', () => {
                return request(app)
                .get('/api/articles')
                .expect(200)
                .then(response => {
                    const randomIndex = Math.floor(Math.random() * response.body.articles.length);
                    expect(response.body.articles).to.be.an('array');
                    expect(response.body.articles[randomIndex]).to.be.an('object');
                    expect(response.body.articles[randomIndex]).to.have.all.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
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

            xit('(GET // 200) allows client to sort articles by any column (defaults to date)', () => {
                return request(app)
                .get('/api/articles?sort_by=title')
                .expect(200)
                .then(response => {
                    expect(response.body.articles[12].title).to.equal('A');
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
                    expect(response.body.articles).to.be.an('object');
                    expect(response.body.articles.body).to.equal('Have you seen the size of that thing?');
                });
            });

            it('(GET // 200) serves up comment info for the specific article, including keys of COMMENT_ID, VOTES, CREATED_AT, AUTHOR and BODY', () => {
                return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then(response => {
                    const randomIndex = Math.floor(Math.random() * response.body.comments.length);
                    expect(response.body.comments[randomIndex]).to.have.all.keys('comment_id', 'votes', 'created_at', 'author', 'body');
                });
            });

            it('(GET // 200) allows client to sort article comments by any column (defaults to date)', () => {
                return request(app)
                //had to change this when my 'orderBy' changed to default to 'desc' - REVISIT
                .get('/api/articles/1/comments?sort_by=votes')
                .expect(200)
                .then(response => {
                    expect(response.body.comments).to.be.descendingBy('votes');
                });
            });

            it('(GET // 200) allows client to specify comments sorting order (defaults to descending)', () => {
                return request(app)
                //just testing the base endpoint, because usually it would default to asc...
                .get('/api/articles/1/comments')
                .expect(200)
                .then(response => {
                    expect(response.body.comments).to.be.descendingBy('created_at')
                });
            });

            it('(PATCH // 200) allows client to increment the votes property in the articles table', () => {
                return request(app)
                .patch('/api/articles/2')
                .send({ inc_votes : 10 })
                .expect(200)
                .then(response => {
                    expect(response.body.article).to.be.an('object');
                    expect(response.body.article.votes).to.equal(10);
                });
            });

            it('(PATCH // 200) allows client to decrement the votes property in the articles table', () => {
                return request(app)
                .patch('/api/articles/2')
                .send({ inc_votes : -10 })
                .expect(200)
                .then(response => {
                    expect(response.body.article).to.be.an('object');
                    expect(response.body.article.votes).to.equal(-10);
                });
            });

            it('(POST // 201) allows client to post a comment to a specified article', () => {
                return request(app)
                .post('/api/articles/8/comments')
                .send({ username: "butter_bridge", body: "I'm nearly finished with my project and I'm so glad!" })
                .expect(201)
                .then(response => {
                    expect(response.body.comment).to.be.an('object');
                    expect(response.body.comment.body).to.equal("I'm nearly finished with my project and I'm so glad!");
                    expect(response.body.comment.author).to.equal("butter_bridge");
                });
            });

            
            describe('ERRORS: /api/articles', () => {

                it('(GET // 400) sends 400 when client trying to sort by column that does not exist', () => {
                    return request(app)
                    .get('/api/articles?sort_by=abc')
                    .expect(400)
                    .then(response => {
                        expect(response.body.msg).to.equal('Bad Request');
                    });
                });

                it('(GET // 400) sends 400 when client trying to order by column that does not exist', () => {
                    return request(app)
                    .get('/api/articles?order=abc')
                    .expect(400)
                    .then(response => {
                        expect(response.body.msg).to.equal('Bad Request');
                    });
                });

                it('(GET // 404) sends 404 when client trying to filter by unregistered user', () => {
                    return request(app)
                    .get('/api/articles?author=me')
                    .expect(404)
                    .then(response => {
                        expect(response.body.msg).to.equal('Resource Not Found');
                    });
                });

                it('(GET // 404) sends 404 when client trying to filter by topic not in database', () => {
                    return request(app)
                    .get('/api/articles?topic=beingMe')
                    .expect(404)
                    .then(response => {
                        expect(response.body.msg).to.equal('Resource Not Found');
                    });
                });

                it('(GET // 204) sends 204 when author exists but does not have any associated articles', () => {
                    return request(app)
                    .get('/api/articles?author=samC')
                    .expect(204)
                    .then(response => {
                        expect(response.body).to.eql({});
                    });
                });

                it('(GET // 204) sends 204 when topic exists but does not have any associated articles', () => {
                    return request(app)
                    .get('/api/articles?topic=dogs')
                    .expect(204)
                    .then(response => {
                        expect(response.body).to.eql({});
                    });
                });

                it('(GET // 404) sends 404 when client makes a well-formed but non-existent article request', () => {
                    return request(app)
                    .get('/api/articles/10000')
                    .expect(404)
                    .then(response => {
                        expect(response.body.msg).to.equal('Resource Not Found');
                    });
                });

                it('(GET // 404) sends 404 when client makes a well-formed but non-existent article comment request', () => {
                    return request(app)
                    .get('/api/articles/10000/comments')
                    .expect(404)
                    .then(response => {
                        expect(response.body.msg).to.equal('Resource Not Found');
                    });
                });

                it('(GET // 204) sends 204 when article exists but has no associated comments', () => {
                    return request(app)
                    .get('/api/articles/13/comments')
                    .expect(204)
                    .then(response => {
                        expect(response.body).to.eql({});
                    });
                });

                it('(PATCH // 405) denies client ability to alter articles', () => {
                    return request(app)
                    .patch('/api/articles')
                    .expect(405)
                    .then(response => {
                        expect(response.body.msg).to.equal('Method Not Allowed');
                    });
                });

                it('(PUT // 405) denies client ability to replace entire articles', () => {
                    return request(app)
                    .put('/api/articles/2')
                    .expect(405)
                    .then(response => {
                        expect(response.body.msg).to.equal('Method Not Allowed');
                    });
                });

                it('(PUT // 405) denies client ability to replace comments', () => {
                    return request(app)
                    .put('/api/articles/2/comments')
                    .expect(405)
                    .then(response => {
                        expect(response.body.msg).to.equal('Method Not Allowed');
                    });
                });

                it('(POST // 404) sends 404 when post request is well-formed but regards a non-existent article', () => {
                    return request(app)
                    .post('/api/articles/10000/comments')
                    .send({ username: "butter_bridge", body: "I'm nearly finished with my project and I'm so glad!" })
                    .expect(404)
                    .then(response => {
                        expect(response.body.msg).to.equal('Resource Not Found');
                    });
                });

                it('(POST // 400) sends 400 when post request is poorly formed but regards an existent article', () => {
                    return request(app)
                    .post('/api/articles/1/comments')
                    .send({ body: "I'm nearly finished with my project and I'm so glad!" })
                    .expect(400)
                    .then(response => {
                        expect(response.body.msg).to.equal('Bad Request');
                    });
                });

                it('(POST // 400) sends 400 when username in body is not a registered user', () => {
                    return request(app)
                    .post('/api/articles/1/comments')
                    .send({ username: "not-a-username", body: "I'm nearly finished with my project and I'm so glad!" })
                    .expect(400)
                    .then(response => {
                        expect(response.body.msg).to.equal('Bad Request');
                    });
                });

                it('(PATCH // 400) sends 400 when request body for vote incrementor is poorly formed', () => {
                    return request(app)
                    .patch('/api/articles/1')
                    .send({ inc_votes : "dog" })
                    .expect(400)
                    .then(response => {
                        expect(response.body.msg).to.equal('Bad Request');
                    });
                });

                it('(GET // 200) allows client to limit article results (defaults to 10)', () => {
                    return request(app)
                    .get('/api/articles?limit=4')
                    .expect(200)
                    .then(response => {
                        expect(response.body.articles.length).to.equal(4);
                    });
                });

                it('(GET // 200) allows client to limit comment results (defaults to 10)', () => {
                    return request(app)
                    .get('/api/articles/1/comments?limit=2')
                    .expect(200)
                    .then(response => {
                        expect(response.body.comments.length).to.equal(2);
                    });
                });

            });

        });

                describe('/users', () => {

                    it('(GET // 200) serves up full list of users and their info (names removed for security)', () => {
                        return request(app)
                        .get('/api/users')
                        .expect(200)
                        .then(response => {
                            const randomIndex = Math.floor(Math.random() * response.body.users.length);
                            expect(response.body.users).to.be.an('array');
                            expect(response.body.users[randomIndex]).to.have.all.keys('username', 'avatar_url');
                        });
                    });
    
                    it('(GET // 200) serves up specific user info using a parametric endpoint', () => {
                        return request(app)
                        .get('/api/users/butter_bridge')
                        .expect(200)
                        .then(response => {
                            expect(response.body.user).to.be.an('object');
                            expect(response.body.user).to.have.all.keys('username', 'avatar_url', 'name');
                        });
                    });

                    describe('ERRORS: /api/users', () => {

                        it('(GET // 404) sends a 404 when user is not registered', () => {
                            return request(app)
                            .get('/api/users/not-a-username')
                            .expect(404)
                            .then(response => {
                                expect(response.body.msg).to.equal('Resource Not Found');
                            });
                        });

                        it('(DELETE // 405) sends 405 when client tries to delete an entire user', () => {
                            return request(app)
                            .delete('/api/users/icellusedkars')
                            .expect(405)
                            .then(response => {
                                expect(response.body.msg).to.equal('Method Not Allowed');
                            });
                        });
                        
                        it('(PUT // 405) sends 405 when client tries to replace an entire user', () => {
                            return request(app)
                            .put('/api/users/icellusedkars')
                            .expect(405)
                            .then(response => {
                                expect(response.body.msg).to.equal('Method Not Allowed');
                            });
                        });

                        it('(DELETE // 405) sends 405 when client tries to delete all users', () => {
                            return request(app)
                            .delete('/api/users')
                            .expect(405)
                            .then(response => {
                                expect(response.body.msg).to.equal('Method Not Allowed');
                            });
                        });

                        it('(PUT // 405) sends 405 when client tries to replace all users', () => {
                            return request(app)
                            .put('/api/users')
                            .expect(405)
                            .then(response => {
                                expect(response.body.msg).to.equal('Method Not Allowed');
                            });
                        });

                    });
        
                });

                describe('/comments', () => {
    
                    it('(PATCH // 200) allows client to increment the votes property in the comments table', () => {
                        return request(app)
                        .patch('/api/comments/6')
                        .send({ inc_votes : 10 })
                        .expect(200)
                        .then(response => {
                            expect(response.body.comment).to.be.an('object');
                            expect(response.body.comment.votes).to.equal(10);
                        });
                    });
        
                    it('(PATCH // 200) allows client to decrement the votes property in the comments table', () => {
                        return request(app)
                        .patch('/api/comments/6')
                        .send({ inc_votes : -10 })
                        .expect(200)
                        .then(response => {
                            expect(response.body.comment).to.be.an('object');
                            expect(response.body.comment.votes).to.equal(-10);
                        });
                    });

                    it('(DELETE // 204) allows client to delete an entire comment', () => {
                        return request(app)
                        .delete('/api/comments/10')
                        .expect(204)
                        .then(response => {
                            expect(response.body).to.eql({});
                        })
                    });

                    describe('ERRORS: /api/comments', () => {

                        it('(PUT // 405) sends 405 when client tries to replace entire comment', () => {
                            return request(app)
                            .put('/api/comments/5')
                            .expect(405)
                            .then(response => {
                                expect(response.body.msg).to.equal('Method Not Allowed');
                            });
                        });

                        it('(PATCH // 404) sends 404 when patch request is well-formed but on a non-existent comment', () => {
                            return request(app)
                            .patch('/api/comments/10000')
                            .send({ inc_votes : 10 })
                            .expect(404)
                            .then(response => {
                                expect(response.body.msg).to.equal('Resource Not Found');
                            });
                        });

                        it('(DELETE // 404) sends 404 when delete request is well-formed but on a non-existent comment', () => {
                            return request(app)
                            .delete('/api/comments/10000')
                            .expect(404)
                            .then(response => {
                                expect(response.body.msg).to.equal('Resource Not Found');
                            });
                        });

                        it('(PATCH // 400) sends 400 when request body is ill-formed', () => {
                            return request(app)
                            .patch('/api/comments/1')
                            .send({ inc_votes : "dog" })
                            .expect(400)
                            .then(response => {
                                expect(response.body.msg).to.equal('Bad Request');
                            });
                        });

                        it('(PATCH // 400) sends 400 when request body is well-formed but endpoint is not', () => {
                            return request(app)
                            .patch('/api/comments/dog')
                            .send({ inc_votes : 1 })
                            .expect(400)
                            .then(response => {
                                expect(response.body.msg).to.equal('Bad Request');
                            });
                        });

                        it('(DELETE // 400) sends 400 when delete request endpoint is ill-formed', () => {
                            return request(app)
                            .delete('/api/comments/dog')
                            .expect(400)
                            .then(response => {
                                expect(response.body.msg).to.equal('Bad Request');
                            });
                        });
                       
                    });
        
                });

                describe('/api', () => {

                    describe('ERRORS: /api', () => {

                        it('(DELETE // 405) denies client ability to delete entire endpoint', () => {
                            return request(app)
                            .delete('/api')
                            .expect(405)
                            .then(response => {
                                expect(response.body.msg).to.equal('Method Not Allowed');
                            });
                        });

                    });

                });

    });

});
