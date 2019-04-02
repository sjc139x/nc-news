//function to turn UNIX timestamp (milliseconds) into a js date object
function formatArticleData (arr) {
    if (arr === []) return [];
    else {
        
        return arr.reduce((acc, item) => {

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

module.exports = formatArticleData;
