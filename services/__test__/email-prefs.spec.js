
const epService = require('../email-prefs');
const epModel = require("../../models/email-prefs");
const customErrors = require("../../helpers/customErrors");
const { ADMIN_ERROR_MSG, EMAIL_PREFERENCES_CONFIG_UPDATED_SUCCESSFULLY, EMAIL_PREFS_NOT_AVAILABLE, USER_EMAIL_PREFERENCES_UPDATED_SUCCESSFULLY, FALSE_STR } = require("../../helpers/constants");

jest.mock('../../models/email-prefs', () => ({
  ...jest.mock('../../models/email-prefs'),
  addEmailPrefsConfig: jest.fn(),
  receiveEmailPrefsConfig: jest.fn(),
  updateUserEmailPrefs: jest.fn(),
  receiveUsersEmailPrefs: jest.fn()
}));

describe("The Email Prefs Modules Service", () => {

  beforeEach(() => {
    jest.resetModules();
    console.log('************* Test Case Begin *************');
  });

  describe("The get Email Prefs Config  Service Api", () => {
    it("should return correct Email Prefs Confog from the model layer", async () => {
      const expected = getEmailPrefsConfigData();
      epModel.receiveEmailPrefsConfig.mockReturnValue(Promise.resolve(expected));
      const actual = await epService.getEmailPrefsConfig();
      console.log("Email Prefs Config Service Response: ", JSON.stringify(actual));
      expect(epModel.receiveEmailPrefsConfig).toHaveBeenCalledTimes(1);
      expect(actual).toBe(expected);
    });
  });

  describe("The post Email Prefs Config  Service Api", () => {
    it("should update correct Email Prefs Config through the model layer1", () => {
      const expected = postEmailPrefsconfigResData();
      const req = addEmailPrefsConfigReq();
      epModel.addEmailPrefsConfig.mockReturnValue(Promise.resolve(expected));
      return epService.postEmailPrefsConfig(req, {}, {})
        .then((actual) => {
          expect(epModel.addEmailPrefsConfig).toHaveBeenCalledTimes(1);
          expect(actual).toBe(EMAIL_PREFERENCES_CONFIG_UPDATED_SUCCESSFULLY);
          console.log("Email Prefs Config Service Post Response: ", actual);
        });
    });
  });

  describe("The post Users Email Prefs Service Api", () => {
    it("should update correct Users Email Prefs through the model layer1", () => {
      const expected = postUsersEmailPrefsResData();
      const req = addUsersEmailPrefReq();
      epModel.updateUserEmailPrefs.mockReturnValue(Promise.resolve(expected));
      return epService.postUsersEmailPrefs(req, {}, {})
        .then((actual) => {
          expect(epModel.updateUserEmailPrefs).toHaveBeenCalledTimes(1);
          expect(actual).toBe(USER_EMAIL_PREFERENCES_UPDATED_SUCCESSFULLY);
          console.log("User's Email Prefs Service Post Response: ", actual);
        });
    });
  });

  describe("The get Users Email Prefs Config  Service Api", () => {
    it("should return correct Users Email Prefs Confog from the model layer", async () => {
      const expected = getUsersEmailPrefsConfigRes();
      epModel.receiveUsersEmailPrefs.mockReturnValue(Promise.resolve(expected));
      const actual = await epService.getUsersEmailPrefs({ uid: 'uid' });
      console.log("Users Email Prefs Config Service Response: ", JSON.stringify(actual));
      expect(epModel.receiveUsersEmailPrefs).toHaveBeenCalledTimes(1);
      expect(actual).toBe(expected);
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
getUsersEmailPrefsConfigRes = () => {
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
addUsersEmailPrefReq = () => {
  return {
    body: {
      "id": "following-topics",
      "status": true
    }
  }
}
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
