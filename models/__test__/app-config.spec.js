
const appConfigModel = require("../app-config");
const { db } = require("../../helpers/firebase");

jest.mock('../../helpers/firebase', () => ({
  ...jest.mock('../../helpers/firebase'),
  db: {
    collection: (config) => {
      return {
        doc: (app) => {
          return {
            set: (p1, p2) => { return true },
            get: () => { return { data: () => { return { "support_email": "help@illo.news" } } } }
          }
        }
      }
    }
  },
  receiveAppConfigs: jest.fn(),
}));

describe("The Config Modules models", () => {

  beforeEach(() => {
    jest.resetModules();
    console.log('************* Test Case Begin *************');
  });

  describe("The get Config Model Api", () => {
    it("should return correct configurations from the firebase layer", async () => {
      const configRefExpected = testData();
      db.collection('config').doc(`app`).get();
      const actual = await appConfigModel.receiveAppConfigs();
      expect(configRefExpected.support_email).toBe(actual.support_email);
    });

    describe("The post Config Model Api", () => {
      it("should update correct configurations through the firebase layer", () => {
        const expected = true;
        return appConfigModel.addAppConfigs(testData())
          .then((actual) => {
            expect(actual).toBe(expected);
            console.log("Config Model Post Response: ", actual);
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