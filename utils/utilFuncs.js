
function formatArticleData (articleArr) {
    if (articleArr === []) return [];
    else {
        return articleArr.reduce((acc, item) => {

            acc.push({
                title: item.title,
                topic: item.topic,
                author: item.author,
                body: item.body,
                created_at: new Date(item.created_at).toUTCString()
            });

            return acc;

        }, []);
    };
};

function formatCommentData (commentArr, articleArr) {
    if (commentArr.length === 0 || articleArr.length === 0) return [];
    else {
        return commentArr.reduce((acc, item) => {

            const articleInfo = articleArr.find(article => {
                return article.title === item.belongs_to;
            });

            acc.push({
                author: item.created_by,
                article_id: articleInfo.article_id,
                votes: item.votes,
                created_at: new Date(item.created_at).toUTCString(),
                body: item.body
            });

            return acc;

        }, []);
    }
};

module.exports = { formatArticleData, formatCommentData };
