const { admin, db } = require("../helpers/firebase");

exports.countUsers = async (allusers = [], count, nextPageToken) => {
  const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
  allusers = [...allusers, ...listUsersResult.users];

  if (listUsersResult.pageToken) {
    console.log("********PAGE_TOKEN********* ", listUsersResult.pageToken);
    allusers = await this.countUsers(
      allusers,
      count,
      listUsersResult.pageToken
    );
  }

  console.log("Users Count : ", allusers.length);
  return allusers;
};

exports.bookmarkStatsDB = async () => {
  let users = [];
  // const userDocs = [];
  const userDocs = await db.collection(`users`).listDocuments();
  let totalBookmarks = 0;

  for (let userDocSnaphot of userDocs) {
    // if(userDocSnaphot.id ==  "xdXJwzoX1IStttXIdIaEOTTvNUF3")
    // {
    const bookmarksDoc = await userDocSnaphot
      .collection("lists")
      .doc("bookmarks")
      .get();
    const bookmarksData = bookmarksDoc.data();
    if (!bookmarksData) {
      continue;
    }

    const userBookmarks = [];
    Object.keys(bookmarksData).forEach(function (key) {
      if (bookmarksData[key].added_date) {
        totalBookmarks++;

        userBookmarks.push({
          article_id: key,
          added_date: bookmarksData[key].added_date,
        });
        console.log(
          "inside for each ",
          JSON.stringify(bookmarksData[key].added_date)
        );
      }
    });

    // console.log("BOOKMARK : ", JSON.stringify(bookmarksData));
    users.push({ id: userDocSnaphot.id, bookmarks: userBookmarks });
    //  break;
    // }
  }
  const stats = { total_bookmarks: totalBookmarks, users: users };

  // const stats = mockData();

  return stats;
};

const mockData = () => {
  return {
    total_bookmarks: 949,
    users: [
      {
        id: "08sWz5ZImhgqUXsaoXQUL1hNitW2",
        bookmarks: [
          {
            article_id: "XOYVNGSVUZEVZDMGZ45N3QHGBU",
            added_date: "2022-07-30T20:19:43.683Z",
          },
        ],
      },
      {
        id: "0B0hmLv8Vhg4U7re3qVevktJR4R2",
        bookmarks: [
          {
            article_id: "N7VX3AZJUVGYXDTCVG322KZ5UQ",
            added_date: "2022-01-12T16:00:17.970Z",
          },
        ],
      },
      {
        id: "0BlpG1Ek92gDb6pWhPjkwGMRwsl2",
        bookmarks: [
          {
            article_id: "HPNTD5ZWOZCY3IDDVCPDA5IV3U",
            added_date: "2022-02-09T17:25:43.927Z",
          },
        ],
      },
      {
        id: "0IxEwNlrIwZwqhskc4aHVDcvqj02",
        bookmarks: [
          {
            article_id: "UUBH5TF5BBFVNIBMFNDBOV4FVQ",
            added_date: "2022-02-11T20:04:29.337Z",
          },
        ],
      },
      {
        id: "0Yeu8mwtPBcL5XrDpFzw2xtBwzD2",
        bookmarks: [
          {
            article_id: "RHLCGGNO5RCPZNHSYBLYSKTDUQ",
            added_date: "2022-03-11T19:36:20.924Z",
          },
        ],
      },
      {
        id: "zwhVn2aE24QGFENF1qdxz6r9Cup1",
        bookmarks: [
          {
            article_id: "R4YSQYPOF5FVPI5HSTOLPSEYFQ",
            added_date: "2022-02-09T01:44:29.081Z",
          },
        ],
      },
    ],
  };
};
