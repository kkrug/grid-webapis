const userController = require("../user");
const userService = require("../../services/user");
const constants = require("../../helpers/constants");

jest.mock("../../services/user", () => ({
  ...jest.mock("../../services/user"),
  delUser: jest.fn(),
}));

describe("The User Data Module Controller", () => {
  beforeEach(() => {
    jest.resetModules();
    console.log("************* Test Case Begin *************");
  });

  describe("Get User Data Controller Api", () => {
    it("should delete correct User and Data from the service layer", () => {
      const expectedRes = constants.USER_DELETED_SUCCESSFULLY;
      const res = {};
      userService.delUser.mockReturnValue(Promise.resolve(expectedRes));
      cb = () => {
        expect(res.message).toBe(expectedRes);
        console.log("Test Data Del User : ", JSON.stringify(res));
      };
      return userController.ctrlDelUser({}, res, cb).then(() => {
        expect(userService.delUser).toHaveBeenCalledTimes(1);
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.log("************* Test Case End *************");
  });
});
