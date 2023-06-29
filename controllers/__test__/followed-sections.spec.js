
const fsController = require('../followed-sections');
const fsService = require("../../services/followed-sections");
const constants = require('../../helpers/constants');

jest.mock('../../services/followed-sections', () => ({
  ...jest.mock('../../services/followed-sections'),
  followUnFollowSections: jest.fn(),
  getAllFollowedSections: jest.fn(),
}));

describe("The Follow Section Module Controller", () => {
  beforeEach(() => {
    jest.resetModules();
    console.log('************* Test Case Begin *************');
  });
  describe("Update Follow Sections Controller Api", () => {
    it("should update Follow Sections through the service layer1", () => {
      const expected = testData();
      const res = {};
      fsService.followUnFollowSections.mockReturnValue(Promise.resolve(expected));
      cb = () => {
        const actualFollowedTopics = res.data;
        expect(actualFollowedTopics.sectionIds[0]).toBe(expected.sectionIds[0]);
        expect(constants.SUCCESS).toBe(res.message);
        console.log("Test Data: ", JSON.stringify(res));
      };
      return fsController.ctrlFollowUnFollowSection(reqBody(), res, cb)
        .then(() => {
          expect(fsService.followUnFollowSections).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("Get Follow Sections Controller Api", () => {
    it("should return correct Follow Sections from the service layer", () => {
      const expectedRes = testData();
      const res = {};
      fsService.getAllFollowedSections.mockReturnValue(Promise.resolve(expectedRes));
      cb = () => {
        expect(res.data).toBe(expectedRes);
        expect(res.message).toBe(constants.SUCCESS);
        console.log("Test Data: ", JSON.stringify(res));
      };
      return fsController.ctrlGetAllFollowedSections({}, res, cb)
        .then(() => {
          expect(fsService.getAllFollowedSections).toHaveBeenCalledTimes(1);
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
      "follow_sections": [
        "/Culture",
        "/events",
        "/global-economy"
      ],
      "unfollow_sections": ["/influence-trends"]
    }
  }
}
testData = () => {
  return {
    "sectionIds": [
      "/Culture",
      "/events",
      "/global-economy"
    ]
  }
}
