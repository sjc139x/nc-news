const { expect } = require("chai");
const {
  formatArticleData,
  formatCommentData,
  checkCommentBodyFormat,
  checkVotesBodyFormat,
  checkUserBodyFormat,
  checkTopicBodyFormat,
  checkArticleBodyFormat
} = require("../utils/utilFuncs");
//simplify below and make more rigorous testing in line with what ant said

describe("formatArticleData()", () => {
  it("returns a new empty array when given an empty array", () => {
    expect(formatArticleData([])).to.eql([]);
  });
  it("returns an item with a reformatted date when given a single item", () => {
    const actual = formatArticleData([
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389,
        image: "https://i.ibb.co/3hCVGwM/iconfinder-38-456512.png",
        votes: 100
      }
    ]);

    const expected = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: "Thu, 18 Aug 2016 12:07:52 GMT",
        image: "https://i.ibb.co/3hCVGwM/iconfinder-38-456512.png",
        votes: 100
      }
    ];

    expect(actual).to.eql(expected);
  });
  it("returns array with reformatted dates when given multiple items", () => {
    const actual = formatArticleData([
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389,
        image: "https://i.ibb.co/3hCVGwM/iconfinder-38-456512.png",
        votes: 100
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: 1500584273256,
        image: "https://i.ibb.co/3hCVGwM/iconfinder-38-456512.png",
        votes: 100
      }
    ]);

    const expected = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: "Thu, 18 Aug 2016 12:07:52 GMT",
        image: "https://i.ibb.co/3hCVGwM/iconfinder-38-456512.png",
        votes: 100
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: "Thu, 20 Jul 2017 20:57:53 GMT",
        image: "https://i.ibb.co/3hCVGwM/iconfinder-38-456512.png",
        votes: 100
      }
    ];

    expect(formatArticleData(actual)).to.eql(expected);
  });
});

describe("formatCommentData()", () => {
  it("returns a new empty array when given two empty arrays", () => {
    expect(formatCommentData([], [])).to.eql([]);
  });
  it("returns a combined and reformatted item when given two single array items", () => {
    const actual = formatCommentData(
      [
        {
          body:
            "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
          belongs_to:
            "The People Tracking Every Touch, Pass And Tackle in the World Cup",
          created_by: "tickle122",
          votes: -1,
          created_at: 1468087638932
        }
      ],
      [
        {
          article_id: 69,
          title:
            "The People Tracking Every Touch, Pass And Tackle in the World Cup",
          body:
            "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
          votes: 0,
          topic: "coding",
          author: "jessjelly",
          created_at: "Thu, 18 Aug 2016 12:07:52 GMT"
        }
      ]
    );

    const expected = [
      {
        author: "tickle122",
        article_id: 69,
        votes: -1,
        created_at: "Sat, 09 Jul 2016 18:07:18 GMT",
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus."
      }
    ];

    expect(actual).to.eql(expected);
  });
  it("returns combined and reformatted items when given two array inputs with multiple items", () => {
    const actual = formatCommentData(
      [
        {
          body:
            "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
          belongs_to:
            "The People Tracking Every Touch, Pass And Tackle in the World Cup",
          created_by: "tickle122",
          votes: -1,
          created_at: 1468087638932
        },
        {
          body:
            "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
          belongs_to: "Making sense of Redux",
          created_by: "grumpy19",
          votes: 7,
          created_at: 1478813209256
        }
      ],
      [
        {
          article_id: 69,
          title:
            "The People Tracking Every Touch, Pass And Tackle in the World Cup",
          body:
            "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
          votes: 0,
          topic: "coding",
          author: "jessjelly",
          created_at: "Thu, 18 Aug 2016 12:07:52 GMT"
        },
        {
          article_id: 111,
          title: "Making sense of Redux",
          body:
            "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
          votes: 0,
          topic: "coding",
          author: "jessjelly",
          created_at: "Thu, 20 Jul 2017 20:57:53 GMT"
        }
      ]
    );

    const expected = [
      {
        author: "tickle122",
        article_id: 69,
        votes: -1,
        created_at: "Sat, 09 Jul 2016 18:07:18 GMT",
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus."
      },
      {
        author: "grumpy19",
        article_id: 111,
        votes: 7,
        created_at: "Thu, 10 Nov 2016 21:26:49 GMT",
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam."
      }
    ];

    expect(actual).to.eql(expected);
  });
});

describe("checkCommentBodyFormat()", () => {
  it("returns true when object is in correct format", () => {
    expect(
      checkCommentBodyFormat({ username: "username", body: "Comment!" })
    ).to.equal(true);
  });
  it("returns false when object is in incorrect format", () => {
    expect(checkCommentBodyFormat({ body: "Comment!" })).to.equal(false);
    expect(
      checkCommentBodyFormat({ body: "Comment!", username: "username" })
    ).to.equal(false);
  });
});

describe("checkVotesBodyFormat()", () => {
  it("returns true when object is in correct format", () => {
    expect(checkVotesBodyFormat({ inc_votes: 5 })).to.equal(true);
  });
  it("returns false when object is in incorrect format", () => {
    expect(checkVotesBodyFormat({ inc_votes: "dog" })).to.equal(false);
    expect(checkVotesBodyFormat({ gfdsdfgh: "dog" })).to.equal(false);
  });
});

describe("checkUserBodyFormat()", () => {
  it("returns true when object is in correct format", () => {
    expect(
      checkUserBodyFormat({
        username: "me",
        name: "Me",
        avatar_url: "https://usercontent1.hubstatic.com/14009216_f1024.jpg"
      })
    ).to.equal(true);
    expect(
      checkUserBodyFormat({ username: "me", name: "Me", avatar_url: "" })
    ).to.equal(true);
    expect(checkUserBodyFormat({ username: "me" })).to.equal(true);
  });
  it("returns false when object is in incorrect format", () => {
    expect(
      checkUserBodyFormat({
        username: "",
        name: "Me",
        avatar_url: "https://usercontent1.hubstatic.com/14009216_f1024.jpg"
      })
    ).to.equal(false);
    expect(
      checkUserBodyFormat({
        name: "Me",
        avatar_url: "https://usercontent1.hubstatic.com/14009216_f1024.jpg"
      })
    ).to.equal(false);
  });
});

describe("checkTopicBodyFormat()", () => {
  it("returns true when object is in correct format", () => {
    expect(
      checkTopicBodyFormat({
        slug: "music",
        description: "music sounds good in my ears"
      })
    ).to.equal(true);
    expect(checkTopicBodyFormat({ slug: "animals", description: "" })).to.equal(
      true
    );
    expect(checkTopicBodyFormat({ slug: "animals" })).to.equal(true);
  });
  it("returns false when object is in incorrect format", () => {
    expect(checkTopicBodyFormat({ slug: "", description: "wat is" })).to.equal(
      false
    );
    expect(checkTopicBodyFormat({ description: "?????" })).to.equal(false);
  });
});

describe("checkArticleBodyFormat()", () => {
  it("returns true when object is in correct format", () => {
    expect(
      checkArticleBodyFormat({
        title: "why music sucks",
        body: "it does not suck",
        author: "paddyB",
        topic: "music"
      })
    ).to.equal(true);
  });
  it("returns false when object is in incorrect format", () => {
    expect(
      checkArticleBodyFormat({
        title: "why music sucks",
        body: "it does not suck",
        author: "",
        topic: "music"
      })
    ).to.equal(false);
    expect(
      checkArticleBodyFormat({ body: "it does not suck", author: "paddyB" })
    ).to.equal(false);
  });
});
