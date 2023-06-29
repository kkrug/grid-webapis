
const bmModel = require("../articles-bookmark");
const { db, admin } = require("../../helpers/firebase");
const { BOOKMARK_LIST } = require("../../helpers/constants");

jest.mock('../../helpers/firebase', () => ({
  ...jest.mock('../../helpers/firebase'),
  db: {
    collection: (col) => {
      return {
        doc: (doc) => {
          return {
            set: (p1, p2) => { return true },
            get: () => {
              return {
                data: () => {
                  return {
                    "KFXCCCPKEBBDJOQNDJJAGTKOP4": {
                      "type": "LISTEN",
                      "title": "America Is Getting Unvaccinated People All Wrong",
                      "img": {}
                    }
                  }
                }
              }
            },
            update: (p1) => { return true },
          }
        }
      }
    },
    batch: () => {
      return {
        set: (p1, p2, p3) => { return true },
        get: () => {
          data: () => {
            return {
              "sectionIds": [
                "/Culture",
                "/events",
                "/global-economy"
              ]
            }
          }
        },
        commit: () => true
      }
    }
  },
  admin: {
    firestore: {
      FieldValue: {
        delete: (p1) => { return true },
      }
    }
  }
}));

describe("The BookMark Article Modules models", () => {

  beforeEach(() => {
    jest.resetModules();
    console.log('************* Test Case Begin *************');
  });

  describe("The get BookMarked Articles Model Api", () => {
    it("should return correct Bookmarked Articles from the firebase layer", async () => {
      const bmExpected = bmGetRs();
      const actual = await bmModel.receiveBookMarkedArticles();
      console.log("recieved 3: ", JSON.stringify(actual));
      expect(JSON.stringify(bmExpected)).toBe(JSON.stringify(actual));
    });
  });

  describe("The post Bookmark Article Model Api", () => {
    it("should update correct Bookmark Articles through the firebase layer", () => {
      const expected = true;
      return bmModel.bookmarkArticle("", reqBody().body.item, reqBody().body.img)
        .then((actual) => {
          console.log("Bookmark Article Model Post Response : ", actual);
        });
    });
  });

  describe("The delete Bookmark Article Model Api", () => {
    it("should delete correct Bookmark Articles through the firebase layer", () => {
      const expected = true;
      return bmModel.deleteBookMarkedArticle("", reqDelBookMark().id)
        .then((actual) => {
          console.log("Bookmark Article Model Delete Response : ", actual);
        });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.log('************* Test Case End *************');
  });
});

reqDelBookMark = () => {
  return {
    "id": "U3TPJ6FDSJE2VKLBITWDHBYYU"
  }
}

reqBody = () => {
  return {
    body: {
      "item":
      {
        "id": "U3TPJ6FDSJE2VKLBITWDHBYYU",
        "title": "Boeing Moved to Fix 777 Engine Covers Before Failures",
        "publish_date": "2021-06-10T12:50:16.569Z"
      },
      "img": {}
    }
  }
}
bmGetRs = () => {
  return {
    "KFXCCCPKEBBDJOQNDJJAGTKOP4": {
      "type": "LISTEN",
      "title": "America Is Getting Unvaccinated People All Wrong",
      "img": {}
    }
  }
}