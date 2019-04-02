const { expect } = require('chai');
const formatArticleData = require('../utils/utilFuncs');

describe('formatArticleData()', () => {
    it('returns a new empty array when given an empty array', () => {
        expect(formatArticleData([])).to.eql([]);
    });
    it('returns an item with a reformatted date when given a single item', () => {
        const actual = formatArticleData([
            {
              title: 'Running a Node App',
              topic: 'coding',
              author: 'jessjelly',
              body: 'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
              created_at: 1471522072389
            }
        ]);

        const expected = [
            {
            title: 'Running a Node App',
            topic: 'coding',
            author: 'jessjelly',
            body: 'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
            created_at: "Thu, 18 Aug 2016 12:07:52 GMT"
            }
        ];

        expect(formatArticleData(actual)).to.eql(expected);
    });
    it('returns array with reformatted dates when given multiple items', () => {
        const actual = formatArticleData([
            {
              title: 'Running a Node App',
              topic: 'coding',
              author: 'jessjelly',
              body: 'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
              created_at: 1471522072389
            },
            {
               title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
               topic: 'coding',
               author: 'jessjelly',
               body: 'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
               created_at: 1500584273256
            }
        ]);

        const expected = [
            {
            title: 'Running a Node App',
            topic: 'coding',
            author: 'jessjelly',
            body: 'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
            created_at: "Thu, 18 Aug 2016 12:07:52 GMT"
            },
            {
                title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
                topic: 'coding',
                author: 'jessjelly',
                body: 'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
                created_at: "Thu, 20 Jul 2017 20:57:53 GMT"
            }
        ];

        expect(formatArticleData(actual)).to.eql(expected);
    });
});
