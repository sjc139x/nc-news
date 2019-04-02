const devData = require('./development-data');
const testData = require('./test-data');

const ENV = process.env.NODE_ENV || 'development';

const data = {
    development: {
        userData: devData.userData,
        topicData: devData.topicData,
        articleData: devData.articleData,
        commentData: devData.commentData
    },
    test: {
        userData: testData.userData,
        topicData: testData.topicData,
        articleData: testData.articleData,
        commentData: testData.commentData
    }
}

module.exports = data[ENV];
