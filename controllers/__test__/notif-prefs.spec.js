
const npController = require('../notif-prefs');
const epService = require("../../services/notif-prefs");
const constants = require('../../helpers/constants');

jest.mock('../../services/notif-prefs', () => ({
  ...jest.mock('../../services/notif-prefs'),
  postNotifPrefsConfig: jest.fn(),
  getNotifPrefsConfig: jest.fn(),
  postUsersNotifPrefs: jest.fn(),
  getUsersNotifPrefs: jest.fn()
}));

describe("The Notif prefs Module Controller", () => {
  beforeEach(() => {
    jest.resetModules();
    console.log('************* Test Case Begin *************');
  });

  describe("Get Notif prefs Controller Api", () => {
    it("should return correct Notif prefs Config from the service layer", () => {
      const expectedRes = getNotifPrefsConfigData();
      const res = {};
      epService.getNotifPrefsConfig.mockReturnValue(Promise.resolve(expectedRes));
      cb = () => {
        expect(res.data).toBe(expectedRes);
        expect(res.message).toBe(constants.SUCCESS);
        console.log("Test Data Get Notif prefs Configs : ", JSON.stringify(res));
      };
      return npController.ctrlGetNotifPrefsConfig({}, res, cb)
        .then(() => {
          expect(epService.getNotifPrefsConfig).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("Update Notif Prefs Config Controller Api", () => {
    it("should update Notif prefs through the service layer1", () => {
      const expectedRes = postNotifPrefsconfigResData();
      const res = {};
      epService.postNotifPrefsConfig.mockReturnValue(Promise.resolve(expectedRes));
      cb = () => {
        const actualRes = res.data;
        expect(actualRes).toBe(expectedRes);
        expect(constants.SUCCESS).toBe(res.message);
        console.log("Test Data Post Notif prefs : ", JSON.stringify(res));
      };
      return npController.ctrlNotifPrefsConfig({}, res, cb)
        .then(() => {
          expect(epService.postNotifPrefsConfig).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("Update User's Notif prefs Controller Api", () => {
    it("should update User's Notif prefs through the service layer1", () => {
      const expectedRes = postUsersNotifPrefsResData();
      const res = {};
      epService.postUsersNotifPrefs.mockReturnValue(Promise.resolve(expectedRes));
      cb = () => {
        const actualRes = res.data;
        expect(actualRes).toBe(expectedRes);
        expect(constants.SUCCESS).toBe(res.message);
        console.log("Test Data  User's Notif prefs: ", JSON.stringify(res));
      };
      return npController.ctrlUsersNotifPrefs({}, res, cb)
        .then(() => {
          expect(epService.postUsersNotifPrefs).toHaveBeenCalledTimes(1);
        });
    });

    it("should Get User's Notif prefs through the service layer1", () => {
      const expectedRes = getUsersNotifPrefsData();
      const res = {};
      epService.getUsersNotifPrefs.mockReturnValue(Promise.resolve(expectedRes));
      cb = () => {
        const actualRes = res.data;
        expect(actualRes).toBe(expectedRes);
        expect(constants.SUCCESS).toBe(res.message);
        console.log("Test Data  User's Notif prefs Get : ", JSON.stringify(res));
      };
      return npController.ctrlGetUsersNotifPrefs({}, res, cb)
        .then(() => {
          expect(epService.getUsersNotifPrefs).toHaveBeenCalledTimes(1);
        });
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
        "title": "The Daily Drop",
        "description": "Get notified when the Daily Drop is ready to ready each day.",
        "id": "the-daily-drop"
      },
      {
        "title": "Following Topics",
        "id": "following-topics",
        "description": "Get notified when their is a new story for the topics you follow."
      },
      {
        "id": "following-journalist",
        "description": "Get notified when journalists you follow publish stories.",
        "title": "Following Journalist"
      },
      {
        "id": "event-reminders",
        "description": "Get updates and reminders about events you are attending.",
        "title": "Event Reminders"
      },
      {
        "id": "polls",
        "description": "Get notified when polls results are ready and published.",
        "title": "Polls"
      }
    ]
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

// {
//   "id": "following-topics",
//   "status": true
// }