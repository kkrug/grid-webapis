
const epController = require('../email-prefs');
const emService = require("../../services/email-prefs");
const constants = require('../../helpers/constants');

jest.mock('../../services/email-prefs', () => ({
  ...jest.mock('../../services/email-prefs'),
  postEmailPrefsConfig: jest.fn(),
  getEmailPrefsConfig: jest.fn(),
  postUsersEmailPrefs: jest.fn(),
  getUsersEmailPrefs: jest.fn()
}));




describe("The Email prefs Module Controller", () => {
  beforeEach(() => {
    jest.resetModules();
    console.log('************* Test Case Begin *************');
  });

  describe("Get Email Prefs Controller Api", () => {
    it("should return correct Email Prefs Config from the service layer", () => {
      const expectedRes = getEmailPrefsConfigData();
      const res = {};
      emService.getEmailPrefsConfig.mockReturnValue(Promise.resolve(expectedRes));
      cb = () => {
        expect(res.data).toBe(expectedRes);
        expect(res.message).toBe(constants.SUCCESS);
        console.log("Test Data Get Email Prefs Configs : ", JSON.stringify(res));
      };
      return epController.ctrlGetEmailPrefsConfig({}, res, cb)
        .then(() => {
          expect(emService.getEmailPrefsConfig).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("Update Emails Prefs Config Controller Api", () => {
    it("should update Email Prefs through the service layer1", () => {
      const expectedRes = postEmailPrefsconfigResData();
      const res = {};
      emService.postEmailPrefsConfig.mockReturnValue(Promise.resolve(expectedRes));
      cb = () => {
        const actualRes = res.data;
        expect(actualRes).toBe(expectedRes);
        expect(constants.SUCCESS).toBe(res.message);
        console.log("Test Data Post Email Prefs : ", JSON.stringify(res));
      };
      return epController.ctrlEmailPrefsConfig({}, res, cb)
        .then(() => {
          expect(emService.postEmailPrefsConfig).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("Update User's Email Prefs Controller Api", () => {
    it("should update User's Email Prefs through the service layer1", () => {
      const expectedRes = postUsersEmailPrefsResData();
      const res = {};
      emService.postUsersEmailPrefs.mockReturnValue(Promise.resolve(expectedRes));
      cb = () => {
        const actualRes = res.data;
        expect(actualRes).toBe(expectedRes);
        expect(constants.SUCCESS).toBe(res.message);
        console.log("Test Data  User's Email Prefs: ", JSON.stringify(res));
      };
      return epController.ctrlUsersEmailPrefs({}, res, cb)
        .then(() => {
          expect(emService.postUsersEmailPrefs).toHaveBeenCalledTimes(1);
        });
    });

    it("should Get User's Email Prefs through the service layer1", () => {
      const expectedRes = getUsersEmailPrefsData();
      const res = {};
      emService.getUsersEmailPrefs.mockReturnValue(Promise.resolve(expectedRes));
      cb = () => {
        const actualRes = res.data;
        expect(actualRes).toBe(expectedRes);
        expect(constants.SUCCESS).toBe(res.message);
        console.log("Test Data  User's Email Prefs Get : ", JSON.stringify(res));
      };
      return epController.ctrlGetUsersEmailPrefs({}, res, cb)
        .then(() => {
          expect(emService.getUsersEmailPrefs).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("Email Prefs Controller Api - Scenario: Negative", () => {
    it("ctrlGetEmailPrefsConfig: ctrlGetBookMarkedArticles: should capture correct error when response from service layer is null", () => {
      const expectedRes = getEmailPrefsConfigData();
      const res = {};
      emService.getEmailPrefsConfig.mockReturnValue(Promise.resolve(expectedRes));
      
      cb = (error) => {
        console.log("ctrlGetBookMarkedArticles: error recieved: ", error);
        expect(error).toHaveProperty(
          "message",
          "Cannot set property 'data' of null"
        );
      };

      return epController.ctrlGetEmailPrefsConfig({}, null, cb)
        .then(() => {
          expect(emService.getEmailPrefsConfig).toHaveBeenCalledTimes(1);
        });
    });

    it("ctrlEmailPrefsConfig: ctrlGetBookMarkedArticles: should capture correct error when response from service layer is null", () => {
      const expectedRes = postEmailPrefsconfigResData();
      const res = {};
      emService.postEmailPrefsConfig.mockReturnValue(Promise.resolve(expectedRes));
      
      cb = (error) => {
        console.log("ctrlEmailPrefsConfig: error recieved: ", error);
        expect(error).toHaveProperty(
          "message",
          "Cannot set property 'data' of null"
        );
      };
      
      return epController.ctrlEmailPrefsConfig({}, null, cb)
        .then(() => {
          expect(emService.postEmailPrefsConfig).toHaveBeenCalledTimes(1);
        });
    });

    it("ctrlUsersEmailPrefs: ctrlGetBookMarkedArticles: should capture correct error when response from service layer is null", () => {
      const expectedRes = postEmailPrefsconfigResData();
      const res = {};
      emService.postUsersEmailPrefs.mockReturnValue(Promise.resolve(expectedRes));
      
      cb = (error) => {
        console.log("ctrlUsersEmailPrefs: error recieved: ", error);
        expect(error).toHaveProperty(
          "message",
          "Cannot set property 'data' of null"
        );
      };
      
      return epController.ctrlUsersEmailPrefs({}, null, cb)
        .then(() => {
          expect(emService.postUsersEmailPrefs).toHaveBeenCalledTimes(1);
        });
    });

    it("ctrlGetUsersEmailPrefs: ctrlGetBookMarkedArticles: should capture correct error when response from service layer is null", () => {
      const expectedRes = postEmailPrefsconfigResData();
      const res = {};
      emService.getUsersEmailPrefs.mockReturnValue(Promise.resolve(expectedRes));
      
      cb = (error) => {
        console.log("ctrlUsersEmailPrefs: error recieved: ", error);
        expect(error).toHaveProperty(
          "message",
          "Cannot set property 'data' of null"
        );
      };
      
      return epController.ctrlGetUsersEmailPrefs({}, null, cb)
        .then(() => {
          expect(emService.getUsersEmailPrefs).toHaveBeenCalledTimes(1);
        });
    });

  });

  afterEach(() => {
    jest.clearAllMocks();
    console.log('************* Test Case End *************');
  });
});

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

postEmailPrefsconfigResData = () => {
  return "Email Preferences Configuration Updated Successfully"
}

postUsersEmailPrefsResData = () => {
  return "Users email preferences updated successfully"
}

getUsersEmailPrefsData = () => {
  return {
    "emailPrefs": [
      "following-topics"
    ]
  }
}