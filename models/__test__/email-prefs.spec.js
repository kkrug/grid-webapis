
const epModel = require("../email-prefs");
const { db, admin } = require("../../helpers/firebase");

jest.mock('../../helpers/firebase', () => ({
  ...jest.mock('../../helpers/firebase'),
  db: {
    collection: (col) => {
      if (col == `/config`) {
        return {
          doc: (doc) => {
            return {
              set: (p1, p2) => { return true },
              get: () => {
                return {
                  data: () => {
                    return {
                      "emailPrefs": [
                        {
                          "description": "Recieve emails when the Daily Drop is ready each day.",
                          "id": "the-daily-drop",
                          "title": "The Daily Drop"
                        },
                        {
                          "id": "following-topics",
                          "description": "Featured stories that we think you’ll enjoy..",
                          "title": "Following Topics"
                        },
                        {
                          "id": "following-journalist",
                          "title": "Following Journalist",
                          "description": "Get notified when journalists you follow publish stories.."
                        },
                        {
                          "title": "Event Reminders",
                          "id": "event-reminders",
                          "description": "Get updates and reminders about events you are attending.."
                        },
                        {
                          "id": "polls",
                          "title": "Polls",
                          "description": "Get notified when polls results are ready and published.."
                        }
                      ]
                    }
                  }
                }
              },
              delete: (p1) => { return true },
            }
          }
        }
      }
      return {
        doc: (doc) => {
          return {
            set: (p1, p2) => { return true },
            get: () => {
              return {
                data: () => {
                  return {
                    "emailPrefs": [
                      "following-topics"
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
        arrayRemove: (p1) => { return true }
      }
    }
  }
}));

describe("The Email Prefs Modules models", () => {

  beforeEach(() => {
    jest.resetModules();
    console.log('************* Test Case Begin *************');
  });

  describe("The post Email Prefs ConfigModel Api", () => {
    it("should update correct Email Prefs Config through the firebase layer", () => {
      const expected = true;
      return epModel.addEmailPrefsConfig(addEmailPrefsConfigReq().body.email_prefs)
        .then((actual) => {
          console.log("Email Prefs Config Model Post Response : ", actual);
        });
    });
  });

  describe("The get Email Prefs Config Model Api", () => {
    it("should return correct Email Prefs Config from the firebase layer", async () => {
      const epExpected = getEmailPrefsConfigData();
      const actual = await epModel.receiveEmailPrefsConfig();
      console.log("recieved email prefs config : ", JSON.stringify(actual));
      expect(JSON.stringify(epExpected)).toBe(JSON.stringify(actual));
    });
  });

  describe("The Update Users Email Prefs Model Api", () => {
    it("should update correct Users Email Prefs through the firebase layer", () => {
      const expected = true;
      return epModel.updateUserEmailPrefs("", "", "")
        .then((actual) => {
          console.log("Users Email Prefs Model Update Response : ", actual);
        });
    });
  });

  describe("The get Users Email Prefs Model Api", () => {
    it("should return correct Users Email Prefs from the firebase layer", async () => {
      const epExpected = getUsersEmailPrefsData();
      const actual = await epModel.receiveUsersEmailPrefs();
      console.log("recieved User email prefs : ", JSON.stringify(actual));
      expect(JSON.stringify(epExpected)).toBe(JSON.stringify(actual));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.log('************* Test Case End *************');
  });
});

addEmailPrefsConfigReq = () => {
  return {
    body: {
      "email_prefs": [
        {
          "id": "the-daily-drop",
          "title": "The Daily Drop",
          "description": "Recieve emails when the Daily Drop is ready each day."
        },
        {
          "id": "following-topics",
          "title": "Following Topics",
          "description": "Featured stories that we think you’ll enjoy.."
        },
        {
          "id": "following-journalist",
          "title": "Following Journalist",
          "description": "Get notified when journalists you follow publish stories.."
        },
        {
          "id": "event-reminders",
          "title": "Event Reminders",
          "description": "Get updates and reminders about events you are attending.."
        },
        {
          "id": "polls",
          "title": "Polls",
          "description": "Get notified when polls results are ready and published.."
        }
      ]
    }
  }
}

getEmailPrefsConfigData = () => {
  return {
    "emailPrefs": [
      {
        "description": "Recieve emails when the Daily Drop is ready each day.",
        "id": "the-daily-drop",
        "title": "The Daily Drop"
      },
      {
        "id": "following-topics",
        "description": "Featured stories that we think you’ll enjoy..",
        "title": "Following Topics"
      },
      {
        "id": "following-journalist",
        "title": "Following Journalist",
        "description": "Get notified when journalists you follow publish stories.."
      },
      {
        "title": "Event Reminders",
        "id": "event-reminders",
        "description": "Get updates and reminders about events you are attending.."
      },
      {
        "id": "polls",
        "title": "Polls",
        "description": "Get notified when polls results are ready and published.."
      }
    ]
  }
}

getUsersEmailPrefsData = () => {
  return {
    "emailPrefs": [
      "following-topics"
    ]
  }
}