const newsLetterSubsController = require("../newsletter-subs");
const newsletterSubsService = require("../../services/newsletter-subs");
const constants = require("../../helpers/constants");

jest.mock("../../services/newsletter-subs", () => ({
  ...jest.mock("../../services/newsletter-subs"),
  postNewsLetterSubs: jest.fn(),
}));

describe("The NewsLetter Subs Module Controller", () => {
  beforeEach(() => {
    jest.resetModules();
    console.log("************* Test Case Begin *************");
  });

  describe("The post Newsletter Subs Controller Api", () => {
    it(`should subscribe to requested newsletters and should correctly update
        the PII DB from the service layer`, () => {
      const expectedRes = newsletterSubPositiveRes();
      const res = {};
      newsletterSubsService.postNewsLetterSubs.mockReturnValue(
        Promise.resolve(expectedRes)
      );
      cb = () => {
        console.log("Test Data: ", JSON.stringify(res));
      };
      return newsLetterSubsController
        .ctrlPostNewsLetterSubs({}, res, cb)
        .then(() => {
          expect(
            newsletterSubsService.postNewsLetterSubs
          ).toHaveBeenCalledTimes(1);
        });
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
    console.log("************* Test Case End *************");
  });
});

newsletterSubPositiveRes = () => {
  return {
    responseCode: 200,
    status: true,
    data: {
      title: "Thank you for signing up",
      subtitle: "Check your email inbox to verify and receive our newsletter",
    },
  };
};
