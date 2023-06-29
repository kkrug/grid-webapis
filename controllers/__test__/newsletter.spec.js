const newsletterController = require("../newsletter");
const newsletterService = require("../../services/newsletter");

jest.mock("../../services/newsletter", () => ({
  ...jest.mock("../../services/newsletter"),
  postNewsLetter: jest.fn(),
}));

describe("The Newsletter Modules Controller", () => {
  beforeEach(() => {
    jest.resetModules();
    console.log("************* Test Case Begin *************");
  });
  describe("The post Newsletter Controller Api", () => {
    it("should post newsletter correctly through the service layer1", () => {
      const expectedRes = positiveResponse();
      const actualRes = positiveResponse();
      newsletterService.postNewsLetter.mockReturnValue(
        Promise.resolve(expectedRes)
      );
      cb = () => {
        console.log("Test Data2 actual: ", JSON.stringify(actualRes));
        console.log("Test Data2 expected: ", JSON.stringify(expectedRes));
        expect(actualRes).toEqual(expectedRes);
      };
      return newsletterController
        .ctrlPostNewsLetter({}, actualRes, cb)
        .then(() => {
          expect(newsletterService.postNewsLetter).toHaveBeenCalledTimes(1);
        });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.log("************* Test Case End *************");
  });
});

positiveResponse = () => {
  return {
    responseCode: 200,
    status: true,
    message: "subscribed",
    data: {
      title: "Thank you for signing up",
      subtitle: "Check your email inbox to verify and receive our newsletter",
    },
  };
};
//test ccmmit to check auto deployment with grid repo - develop
