
const fsModel = require("../followed-sections");
const { db, admin } = require("../../helpers/firebase");

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
                    "sectionIds": [
                      "/Culture",
                      "/events",
                      "/global-economy"
                    ]
                  }
                }
              }
            },
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
        arrayUnion: (p1) => { return true },
        arrayRemove: (p1) => { return true },
      }
    }
  }
}));

describe("The Follow Sections Modules models", () => {

  beforeEach(() => {
    jest.resetModules();
    console.log('************* Test Case Begin *************');
  });

  describe("The get Follow Sections Model Api", () => {
    it("should return correct Follow Sections from the firebase layer", async () => {
      const fsExpected = testData();
      const actual = await fsModel.receiveFollowedSections();
      console.log("recieved 3: ", JSON.stringify(actual));
      expect(JSON.stringify(fsExpected)).toBe(JSON.stringify(actual));
    });

    describe("The post Follow Sections Model Api", () => {
      it("should update correct Follow Sections through the firebase layer", () => {
        const expected = true;
        return fsModel.updateFollowedSections("", reqBody().body.follow_sections, reqBody().body.unfollow_sections)
          .then((actual) => {
            console.log("Follow Sections Model Post Response 1: ", actual);
          });
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.log('************* Test Case End *************');
  });
});

reqBody = () => {
  return {
    body: {
      "follow_sections": [
        "/Culture",
        "/events",
        "/global-economy"
      ],
      "unfollow_sections": ["/influence-trends"]
    }
  }
}
testData = () => {
  return {
    "sectionIds": [
      "/Culture",
      "/events",
      "/global-economy"
    ]
  }
}
