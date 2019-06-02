function formatArticleData(articleArr) {
  if (articleArr === []) return [];
  else {
    return articleArr.reduce((acc, item) => {
      acc.push({
        title: item.title,
        topic: item.topic,
        author: item.author,
        body: item.body,
        created_at: new Date(item.created_at).toUTCString(),
        votes: item.votes,
        image: item.image
      });

      return acc;
    }, []);
  }
}

function formatCommentData(commentArr, articleArr) {
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
}

function checkCommentBodyFormat(body) {
  if (
    Object.keys(body).toString() === ["username", "body"].toString() &&
    body.username !== "" &&
    body.body !== ""
  )
    return true;
  else return false;
}

function checkVotesBodyFormat(body) {
  if (
    typeof Object.values(body)[0] === "number" &&
    Object.keys(body)[0].toString() === ["inc_votes"].toString()
  )
    return true;
  else return false;
}

function checkUserBodyFormat(body) {
  if (Object.keys(body)[0] === "username" && body.username !== "") return true;
  else return false;
}

function checkTopicBodyFormat(body) {
  if (Object.keys(body)[0] === "slug" && body.slug !== "") return true;
  else return false;
}

function checkArticleBodyFormat(body) {
  if (
    Object.keys(body).toString() ===
      ["title", "body", "author", "topic"].toString() &&
    body.title !== "" &&
    body.body !== "" &&
    body.author !== "" &&
    body.topic !== ""
  )
    return true;
  else return false;
}

module.exports = {
  formatArticleData,
  formatCommentData,
  checkCommentBodyFormat,
  checkVotesBodyFormat,
  checkUserBodyFormat,
  checkTopicBodyFormat,
  checkArticleBodyFormat
};
