
const appConfigService = require('../app-config');
const appConfigModel = require("../../models/app-config");
const { APP_CONFIG_UPDATED_SUCCESSFULLY } = require("../../helpers/constants");

jest.mock('../../models/app-config', () => ({
  ...jest.mock('../../models/app-config'),
  addAppConfigs: jest.fn(),
  receiveAppConfigs: jest.fn(),
}));

describe("The Config Modules Service", () => {

  beforeEach(() => {
    jest.resetModules();
    console.log('************* Test Case Begin *************');
  });

  describe("The get Config Service Api", () => {
    it("should return correct configurations from the model layer", async () => {
      const expected = testData();
      appConfigModel.receiveAppConfigs.mockReturnValue(Promise.resolve(expected));
      const actual = await appConfigService.getAppConfigs();
      console.log("Config Service Response: ", JSON.stringify(actual));
      expect(appConfigModel.receiveAppConfigs).toHaveBeenCalledTimes(1);
      expect(actual.feedback_email).toBe(expected.feedback_email);
    });

    describe("The post Config Service Api", () => {
      it("should update correct configurations through the model layer1", () => {
        const expected = testData();
        const res = {};
        appConfigModel.receiveAppConfigs.mockReturnValue(Promise.resolve(expected));
        return appConfigService.postAppConfigs(expected)
          .then((actual) => {
            expect(appConfigModel.receiveAppConfigs).toHaveBeenCalledTimes(1);
            expect(appConfigModel.addAppConfigs).toHaveBeenCalledTimes(1);
            expect(actual).toBe(APP_CONFIG_UPDATED_SUCCESSFULLY);
            console.log("Config Service Post Response: ", actual);
          });
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.log('************* Test Case End *************');
  });
});

testData = () => {
  return {
    "support_email": "help@illo.news",
    "feedback_email": "help@illo.news",
    "offline_message": "Can’t connect to The Summit. If you are offline, please reconnect and try again.",
    "domain": "thesummit-the-summit-sandbox.cdn.arcpublishing.com",
    "term_url": "https://www.freeprivacypolicy.com/live/c8de5847-710f-4c6f-953a-fa2e3943aa7a",
    "privacy_policy": "https://www.freeprivacypolicy.com/live/c8de5847-710f-4c6f-953a-fa2e3943aa7a",
    "about_us": "https://www.freeprivacypolicy.com/live/c8de5847-710f-4c6f-953a-fa2e3943aa7a",
    "forget_password_url": "https://www.freeprivacypolicy.com/live/c8de5847-710f-4c6f-953a-fa2e3943aa7a",
    "resizerURL": "https://thesummit-the-summit-prod.cdn.arcpublishing.com/resizer",
    "latest_version": "1.0",
    "minimum_spported_version": "1.0",
    "website_url": "https://thesummit-the-summit-sandbox.cdn.arcpublishing.com/",
    "site_id": "the-summit"
  }
}