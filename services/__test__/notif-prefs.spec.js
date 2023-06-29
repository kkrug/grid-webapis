
const npService = require('../notif-prefs');
const npModel = require("../../models/notif-prefs");
const { ADMIN_ERROR_MSG, NOTIF_PREFERENCES_CONFIG_UPDATED_SUCCESSFULLY, EMAIL_PREFS_NOT_AVAILABLE, USER_NOTIFICATION_PREFERENCES_UPDATED_SUCCESSFULLY, FALSE_STR } = require("../../helpers/constants");

jest.mock('../../models/notif-prefs', () => ({
  ...jest.mock('../../models/notif-prefs'),
  addNotifPrefsConfig: jest.fn(),
  receiveNotifPrefsConfig: jest.fn(),
  updateUserNotifPrefs: jest.fn(),
  receiveUsersNotifPrefs: jest.fn()
}));




describe("The Notif Prefs Modules Service", () => {

  beforeEach(() => {
    jest.resetModules();
    console.log('************* Test Case Begin *************');
  });

  describe("The get Notif Prefs Config  Service Api", () => {
    it("should return correct Notif Prefs Confog from the model layer", async () => {
      const expected = getNotifPrefsConfigData();
      npModel.receiveNotifPrefsConfig.mockReturnValue(Promise.resolve(expected));
      const actual = await npService.getNotifPrefsConfig();
      console.log("Notif Prefs Config Service Response: ", JSON.stringify(actual));
      expect(npModel.receiveNotifPrefsConfig).toHaveBeenCalledTimes(1);
      expect(actual).toBe(expected);
    });
  });

  describe("The post Notif Prefs Config  Service Api", () => {
    it("should update correct Notif Prefs Config through the model layer1", () => {
      const expected = postNotifPrefsconfigResData();
      const req = addNotifPrefsConfigReq();
      npModel.addNotifPrefsConfig.mockReturnValue(Promise.resolve(expected));
      return npService.postNotifPrefsConfig(req, {}, {})
        .then((actual) => {
          expect(npModel.addNotifPrefsConfig).toHaveBeenCalledTimes(1);
          expect(actual).toBe(NOTIF_PREFERENCES_CONFIG_UPDATED_SUCCESSFULLY);
          console.log("Notif Prefs Config Service Post Response: ", actual);
        });
    });
  });

  describe("The post Users Notif Prefs Service Api", () => {
    it("should update correct Users Notif Prefs through the model layer1", () => {
      const expected = postUsersNotifPrefsResData();
      const req = addUsersNotifPrefReq();
      npModel.updateUserNotifPrefs.mockReturnValue(Promise.resolve(expected));
      return npService.postUsersNotifPrefs(req, {}, {})
        .then((actual) => {
          expect(npModel.updateUserNotifPrefs).toHaveBeenCalledTimes(1);
          expect(actual).toBe(USER_NOTIFICATION_PREFERENCES_UPDATED_SUCCESSFULLY);
          console.log("User's Notif Prefs Service Post Response: ", actual);
        });
    });
  });

  describe("The get Users Notif Prefs Config  Service Api", () => {
    it("should return correct Users Notif Prefs Confog from the model layer", async () => {
      const expected = getUsersEmailPrefsData();
      npModel.receiveUsersNotifPrefs.mockReturnValue(Promise.resolve(expected));
      const actual = await npService.getUsersNotifPrefs({ uid: 'uid' });
      console.log("Users Notif Prefs Config Service Response: ", JSON.stringify(actual));
      expect(npModel.receiveUsersNotifPrefs).toHaveBeenCalledTimes(1);
      expect(actual).toBe(expected);
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
          "title":"The Daily Drop",
          "description":"Get notified when the Daily Drop is ready each day."
         },
     {
          "id": "following-topics",
          "title":"Following Topics",
          "description":"Get notified when their is a new story for the topics you follow."
         },
     {
          "id": "following-journalist",
          "title":"Following Journalist",
          "description":"Get notified when journalists you follow publish stories."
         },
     {
          "id": "event-reminders",
          "title":"Event Reminders",
          "description":"Get updates and reminders about events you are attending."
         },
     {
          "id": "polls",
          "title":"Polls",
          "description":"Get notified when polls results are ready and published."
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

getUsersEmailPrefsData = () => {
  return {
    "notifPrefs": [
        "following-topics"
    ]
}
}
