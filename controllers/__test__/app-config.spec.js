const appConfigController = require("../app-config");
const appConfigService = require("../../services/app-config");
const constants = require("../../helpers/constants");

jest.mock("../../services/app-config", () => ({
  ...jest.mock("../../services/app-config"),
  postAppConfigs: jest.fn(),
  getAppConfigs: jest.fn(),
  getAppConfigsV2: jest.fn(),
}));

describe("The Config Modules Controller", () => {
  beforeEach(() => {
    jest.resetModules();
    console.log("************* Test Case Begin *************");
  });
  describe("The get Config Controller Api", () => {
    it("should return correct configurations from the service layer", () => {
      const message = "resMessage";
      const res = {};
      appConfigService.getAppConfigs.mockReturnValue(Promise.resolve(message));
      cb = () => {
        expect(res.data).toBe("resMessage");
        expect(res.message).toBe(constants.SUCCESS);
        console.log("Test Data: ", JSON.stringify(res));
      };
      return appConfigController.ctrlGetAppConfigs({}, res, cb).then(() => {
        expect(appConfigService.getAppConfigs).toHaveBeenCalledTimes(1);
      });
    });

    it("V2 - should return correct configurations from the service layer", () => {
      process.env.APP_CONFIG_SECRET = "MIICWwIBAAKBgQCUox";
      const message = "resMessage";
      const res = {};
      appConfigService.getAppConfigsV2.mockReturnValue(
        Promise.resolve(message)
      );
      cb = () => {
        expect(res.data).toBe("resMessage");
        expect(res.message).toBe(constants.SUCCESS);
        console.log("Test Data: ", JSON.stringify(res));
      };
      return appConfigController
        .ctrlGetAppConfigsV2(
          {
            headers: {
              appconfigkey:
                "$2a$12$f2JPb1HI5fF2/E2vX0m19.J7/IRVms1Ak5e7fAUt5qFOo7n8KSIt.",
            },
          },
          res,
          cb
        )
        .then(() => {
          expect(appConfigService.getAppConfigsV2).toHaveBeenCalledTimes(1);
        });
    });

    describe("The post Config Controller Api", () => {
      it("should update correct configurations through the service layer1", () => {
        const expected = testData();
        const res = {};
        appConfigService.postAppConfigs.mockReturnValue(
          Promise.resolve(expected)
        );
        cb = () => {
          const actualSupportEmail = res.data.support_email;
          expect(actualSupportEmail).toBe(expected.support_email);
          console.log("Test Data: ", JSON.stringify(res));
        };
        return appConfigController
          .ctrlAddAppConfigs(expected, res, cb)
          .then(() => {
            expect(appConfigService.postAppConfigs).toHaveBeenCalledTimes(1);
          });
      });
    });

    describe("App Config Controller Api - Scenaario: Negative", () => {
      it("should capture correct error when response from service layer is null", async () => {
        const message = "resMessage";
        const res = {};

        appConfigService.getAppConfigs.mockReturnValue(
          Promise.resolve(message)
        );

        cb = (error) => {
          console.log("error recieved: ", error);
          expect(error).toHaveProperty(
            "message",
            "Cannot set property 'data' of null"
          );
        };

        return appConfigController.ctrlGetAppConfigs({}, null, cb).then(() => {
          expect(appConfigService.getAppConfigs).toHaveBeenCalledTimes(1);
        });
      });

      it("should capture correct error when response from service layer for ctrlAddAppConfigs is null", async () => {
        const expected = testData();

        appConfigService.postAppConfigs.mockReturnValue(
          Promise.resolve(expected)
        );

        cb = (error) => {
          console.log("ctrlAddAppConfigs: error recieved : ", error);
          expect(error).toHaveProperty(
            "message",
            "Cannot set property 'data' of null"
          );
        };

        return appConfigController.ctrlAddAppConfigs({}, null, cb).then(() => {
          expect(appConfigService.postAppConfigs).toHaveBeenCalledTimes(1);
        });
      });

      it("should capture correct error when appconfigkey for ctrlGetAppConfigsV2 is not present", async () => {
        const expected = testData();

        appConfigService.getAppConfigsV2.mockReturnValue(
          Promise.resolve(expected)
        );

        cb = (error) => {
          console.log("ctrlGetAppConfigsV2: error recieved : ", error);
          expect(error).toHaveProperty("httpStatus", 403);
        };

        return appConfigController
          .ctrlGetAppConfigsV2({ headers: {} }, {}, cb)
          .then(() => {
            expect(appConfigService.getAppConfigsV2).toHaveBeenCalledTimes(0);
          });
      });

      it("should capture correct error when appconfigkey for ctrlGetAppConfigsV2 is incorrect", async () => {
        const expected = testData();

        appConfigService.getAppConfigsV2.mockReturnValue(
          Promise.resolve(expected)
        );

        cb = (error) => {
          console.log("ctrlGetAppConfigsV2: error recieved : ", error);
          expect(error).toHaveProperty("httpStatus", 403);
        };

        return appConfigController
          .ctrlGetAppConfigsV2(
            { headers: { appconfigkey: "wrong_key" } },
            {},
            cb
          )
          .then(() => {
            expect(appConfigService.getAppConfigsV2).toHaveBeenCalledTimes(0);
          });
      });
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
    console.log("************* Test Case End *************");
  });
});

testData = () => {
  return {
    support_email: "help@illo.news",
    feedback_email: "help@illo.news",
    offline_message:
      "Can’t connect to The Summit. If you are offline, please reconnect and try again.",
    domain: "thesummit-the-summit-sandbox.cdn.arcpublishing.com",
    term_url:
      "https://www.freeprivacypolicy.com/live/c8de5847-710f-4c6f-953a-fa2e3943aa7a",
    privacy_policy:
      "https://www.freeprivacypolicy.com/live/c8de5847-710f-4c6f-953a-fa2e3943aa7a",
    about_us:
      "https://www.freeprivacypolicy.com/live/c8de5847-710f-4c6f-953a-fa2e3943aa7a",
    forget_password_url:
      "https://www.freeprivacypolicy.com/live/c8de5847-710f-4c6f-953a-fa2e3943aa7a",
    resizerURL:
      "https://thesummit-the-summit-prod.cdn.arcpublishing.com/resizer",
    latest_version: "1.0",
    minimum_spported_version: "1.0",
    website_url: "https://thesummit-the-summit-sandbox.cdn.arcpublishing.com/",
    site_id: "the-summit",
  };
};
//test ccmmit to check auto deployment with grid repo - develop
