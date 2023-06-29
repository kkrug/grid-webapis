
const ptController = require('../popular-topics');
const ptService = require("../../services/popular-topics");
const constants = require('../../helpers/constants');

jest.mock('../../services/popular-topics', () => ({
  ...jest.mock('../../services/popular-topics'),
  processPopularTopics: jest.fn(),
  getPopularTopics: jest.fn(),
}));

describe("The Popular Topics Module Controller", () => {
  beforeEach(() => {
    jest.resetModules();
    console.log('************* Test Case Begin *************');
  });
  describe("Update Popular Topics Controller Api", () => {
    it("should update Popular Topics through the service layer1", () => {
      const expected = popularTopicsUpdRes();
      const res = {};
      ptService.processPopularTopics.mockReturnValue(Promise.resolve(expected));
      cb = () => {
        expect(expected).toBe(res.message);
        expect(true).toBe(res.data.success);
        console.log("Test Data: ", JSON.stringify(res));
      };
      return ptController.ctrlPostPopularTopics(reqBody(), res, cb)
        .then(() => {
          expect(ptService.processPopularTopics).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("Get Popular Topics Controller Api", () => {
    it("should return correct Popular Topics from the service layer", () => {
      const expectedRes = getPopularTopicsRes();
      const res = {};
      ptService.getPopularTopics.mockReturnValue(Promise.resolve(expectedRes));
      cb = () => {
        expect(res.data).toBe(expectedRes);
        expect(res.message).toBe(constants.SUCCESS);
        console.log("Test Data: ", JSON.stringify(res));
      };
      return ptController.ctrlGetPopularTopics(reqQuery(), res, cb)
        .then(() => {
          expect(ptService.getPopularTopics).toHaveBeenCalledTimes(1);
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
      "startDate": "30daysAgo",
      "endDate": "today"
    }
  }
}
reqQuery = () => {
  return {
    query: {
      "sectionId": "global-economy",
      "offset": 0,
      "size": 5
    }
  }
}

getPopularTopicsRes = () => {
  return {
    "total": 7,
    "ids": [
      "FVDNJ3YIKNGEDIY3JN2RFXXNGE",
      "AV2LFDI47JH5FDSK3XKS5NYHYY",
      "RZLJTN6WVZDNDP3GBEXSNB2UDY",
      "NQ6ZUGR2AZABPGVSSSSEJSEG3A",
      "BIUNIQZOJZBBNBYQVEKWIVXAQA"
    ]
  }
}
popularTopicsUpdRes = () => {
  return "Job Completed Successfully";
}
