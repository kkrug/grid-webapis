
const epModel = require("../notif-prefs");
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
                      "notifPrefs": [
                        {
                          "description": "Get notified when the Daily Drop is ready to ready each day.",
                          "id": "the-daily-drop",
                          "title": "The Daily Drop"
                        },
                        {
                          "description": "Get notified when their is a new story for the topics you follow.",
                          "id": "following-topics",
                          "title": "Following Topics"
                        },
                        {
                          "title": "Following Journalist",
                          "id": "following-journalist",
                          "description": "Get notified when journalists you follow publish stories."
                        },
                        {
                          "id": "event-reminders",
                          "title": "Event Reminders",
                          "description": "Get updates and reminders about events you are attending."
                        },
                        {
                          "id": "polls",
                          "title": "Polls",
                          "description": "Get notified when polls results are ready and published."
                        },
                        {
                          "description": "Get notified when the Daily Drop is ready each day.",
                          "title": "The Daily Drop",
                          "id": "the-daily-drop"
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
                    "notifPrefs": [
                      "following-topics"
                    ]
                  }
                }
              }
            },
          }
        }
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

describe("The Notif Prefs Modules models", () => {

  beforeEach(() => {
    jest.resetModules();
    console.log('************* Test Case Begin *************');
  });

  describe("The post Notif Prefs ConfigModel Api", () => {
    it("should update correct Notif Prefs Config through the firebase layer", () => {
      const expected = true;
      return epModel.addNotifPrefsConfig(addNotifPrefsConfigReq().body.notif_prefs)
        .then((actual) => {
          console.log("Notif Prefs Config Model Post Response : ", actual);
        });
    });
  });

  describe("The get Notif Prefs Config Model Api", () => {
    it("should return correct Notif Prefs Config from the firebase layer", async () => {
      const epExpected = getNotifPrefsConfigData();
      const actual = await epModel.receiveNotifPrefsConfig();
      console.log("recieved Notif Prefs config : ", JSON.stringify(actual));
      expect(JSON.stringify(epExpected)).toBe(JSON.stringify(actual));
    });
  });

  describe("The Update Users Notif Prefs Model Api", () => {
    it("should update correct Users Notif Prefs through the firebase layer", () => {
      const expected = true;
      return epModel.updateUserNotifPrefs("", "", "")
        .then((actual) => {
          console.log("Users Notif Prefs Model Update Response : ", actual);
        });
    });
  });

  // exports.receiveUsersNotifPrefs = async (uid) => {
  //   const notifPrefsRef = await db.collection(`/users/${uid}/preferences`).doc('notification').get();
  //   return notifPrefsRef ? notifPrefsRef.data() : {};
  // };

  describe("The get Users Notif Prefs Model Api", () => {
    it("should return correct Users Notif Prefs from the firebase layer", async () => {
      const epExpected = getUsersNotifPrefsData();
      const actual = await epModel.receiveUsersNotifPrefs();
      console.log("recieved User Notif Prefs : ", JSON.stringify(actual));
      expect(JSON.stringify(epExpected)).toBe(JSON.stringify(actual));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.log('************* Test Case End *************');
  });
});

getNotifPrefsConfigData = () => {
  return {
    "notifPrefs": [
      {
        "description": "Get notified when the Daily Drop is ready to ready each day.",
        "id": "the-daily-drop",
        "title": "The Daily Drop"
      },
      {
        "description": "Get notified when their is a new story for the topics you follow.",
        "id": "following-topics",
        "title": "Following Topics"
      },
      {
        "title": "Following Journalist",
        "id": "following-journalist",
        "description": "Get notified when journalists you follow publish stories."
      },
      {
        "id": "event-reminders",
        "title": "Event Reminders",
        "description": "Get updates and reminders about events you are attending."
      },
      {
        "id": "polls",
        "title": "Polls",
        "description": "Get notified when polls results are ready and published."
      },
      {
        "description": "Get notified when the Daily Drop is ready each day.",
        "title": "The Daily Drop",
        "id": "the-daily-drop"
      }
    ]
  }
}
getUsersNotifPrefsConfigRes = () => {
  return {
    "emailPrefs": [
      {
        "id": "the-daily-drop",
        "title": "The Daily Drop",
        "description": "Recieve emails when the Daily Drop is ready each day."
      },
      {
        "id": "following-topics",
        "description": "Featured stories that we think you’ll enjoy..",
        "title": "Following Topics"
      },
      {
        "description": "Get notified when journalists you follow publish stories..",
        "title": "Following Journalist",
        "id": "following-journalist"
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
addUsersNotifPrefReq = () => {
  return {
    body: {
      "id": "following-topics",
      "status": true
    }
  }
}
addNotifPrefsConfigReq = () => {
  return {
    body: {
      "notif_prefs": [
        {
          "id": "the-daily-drop",
          "title": "The Daily Drop",
          "description": "Get notified when the Daily Drop is ready each day."
        },
        {
          "id": "following-topics",
          "title": "Following Topics",
          "description": "Get notified when their is a new story for the topics you follow."
        },
        {
          "id": "following-journalist",
          "title": "Following Journalist",
          "description": "Get notified when journalists you follow publish stories."
        },
        {
          "id": "event-reminders",
          "title": "Event Reminders",
          "description": "Get updates and reminders about events you are attending."
        },
        {
          "id": "polls",
          "title": "Polls",
          "description": "Get notified when polls results are ready and published."
        }
      ]
    }
  }
}
postNotifPrefsconfigResData = () => {
  return "Notification Preferences Configuration Updated Successfully"
}

postUsersNotifPrefsResData = () => {
  return "Users Notification preferences updated successfully"
}

getUsersNotifPrefsData = () => {
  return {
    "notifPrefs": [
      "following-topics"
    ]
  }
}