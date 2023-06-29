
const fsService = require('../followed-sections');
const fsModel = require("../../models/followed-sections");
const customErrors = require("../../helpers/customErrors");
const { ADMIN_ERROR_MSG, FOLLOW_SECTION_UPDATED_SUCCESSFULLY } = require("../../helpers/constants");

jest.mock('../../models/followed-sections', () => ({
  ...jest.mock('../../models/followed-sections'),
  updateFollowedSections: jest.fn(),
  receiveFollowedSections: jest.fn(),
}));

describe("The Follow Todpics Modules Service", () => {

  beforeEach(() => {
    jest.resetModules();
    console.log('************* Test Case Begin *************');
  });

  describe("The post Follow Todpics Service Api", () => {
    it("should update correct Follow Todpics through the model layer1", () => {
      const expected = testData();
      const res = {};
      fsModel.updateFollowedSections.mockReturnValue(Promise.resolve(expected));
      return fsService.followUnFollowSections("", {}, {})
        .then((actual) => {
          expect(fsModel.updateFollowedSections).toHaveBeenCalledTimes(1);
          expect(actual).toBe(FOLLOW_SECTION_UPDATED_SUCCESSFULLY);
          console.log("Follow Todpics Service Post Response: ", actual);
        });
    });
  });

  describe("The get Follow Todpics  Service Api", () => {
    it("should return correct Follow Todpics from the model layer", async () => {
      const expected = testData();
      fsModel.receiveFollowedSections.mockReturnValue(Promise.resolve(expected));
      const actual = await fsService.getAllFollowedSections();
      console.log("Follow Todpics Service Response: ", JSON.stringify(actual));
      expect(fsModel.receiveFollowedSections).toHaveBeenCalledTimes(1);
      expect(actual).toBe(expected);
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
