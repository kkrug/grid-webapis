
const bmController = require('../articles-bookmark');
const bmService = require("../../services/articles-bookmark");
const constants = require('../../helpers/constants');

jest.mock('../../services/articles-bookmark', () => ({
  ...jest.mock('../../services/articles-bookmark'),
  getBookMarkedArticles: jest.fn(),
  bookmarkAnArticle: jest.fn(),
  UnBookmarkAnArticle: jest.fn()
}));


describe("The Article Bookmark Module Controller", () => {
  beforeEach(() => {
    jest.resetModules();
    console.log('************* Test Case Begin *************');
  });

  describe("Get Bookmark Article Controller Api", () => {
    it("should return correct Bookmarked from the service layer", () => {
      const expectedRes = getAllBookMarkResData();
      const res = {};
      bmService.getBookMarkedArticles.mockReturnValue(Promise.resolve(expectedRes));
      cb = () => {
        expect(res.data).toBe(expectedRes);
        expect(res.message).toBe(constants.SUCCESS);
        console.log("Test Data Get All BookMark Article : ", JSON.stringify(res));
      };
      return bmController.ctrlGetBookMarkedArticles({}, res, cb)
        .then(() => {
          expect(bmService.getBookMarkedArticles).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("Update Bookmark Article Controller Api", () => {
    it("should update Bookmark Articles through the service layer1", () => {
      const expectedRes = postBookMarkResData();
      const res = {};
      bmService.bookmarkAnArticle.mockReturnValue(Promise.resolve(expectedRes));
      cb = () => {
        const actualRes = res.data;
        expect(actualRes).toBe(expectedRes);
        expect(constants.SUCCESS).toBe(res.message);
        console.log("Test Data Post BookMark Article : ", JSON.stringify(res));
      };
      return bmController.ctrlBookmarkArticle({}, res, cb)
        .then(() => {
          expect(bmService.bookmarkAnArticle).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("Remove Bookmark Article Controller Api", () => {
    it("should remove Bookmark Articles through the service layer1", () => {
      const expectedRes = postBookMarkResData();
      const res = {};
      bmService.UnBookmarkAnArticle.mockReturnValue(Promise.resolve(expectedRes));
      cb = () => {
        const actualRes = res.data;
        expect(actualRes).toBe(expectedRes);
        expect(constants.SUCCESS).toBe(res.message);
        console.log("Test Data Delete BookMark Article : ", JSON.stringify(res));
      };
      return bmController.ctrlUnBookmarkArticle({}, res, cb)
        .then(() => {
          expect(bmService.UnBookmarkAnArticle).toHaveBeenCalledTimes(1);
        });
    });

    it("should not remove Bookmark Articles if error through the service layer1", () => {
      const expectedRes = postBookMarkResData();
      const res = {};
      bmService.UnBookmarkAnArticle.mockReturnValue(Promise.resolve(delBookMarkResDataNegative1()));
      cb = () => {
        const actualRes = res.data;
        expect(actualRes).not.toBe(expectedRes);
        expect(constants.SUCCESS).toBe(res.message);
        console.log("Test Data Delete BookMark Article : ", JSON.stringify(res));
      };
      return bmController.ctrlUnBookmarkArticle({}, res, cb)
        .then(() => {
          expect(bmService.UnBookmarkAnArticle).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("Article Bookmark Controller Api - Scenario: Negative", () => {
    it("ctrlGetBookMarkedArticles: should capture correct error when response from service layer is null", () => {
      const expectedRes = getAllBookMarkResData();
      const res = {};
      bmService.getBookMarkedArticles.mockReturnValue(Promise.resolve(expectedRes));
     
      cb = (error) => {
        console.log("ctrlGetBookMarkedArticles: error recieved: ", error);
        expect(error).toHaveProperty(
          "message",
          "Cannot set property 'data' of null"
        );
      };

      return bmController.ctrlGetBookMarkedArticles({}, null, cb)
        .then(() => {
          expect(bmService.getBookMarkedArticles).toHaveBeenCalledTimes(1);
        });
    });

    it("ctrlGetBookMarkedArticles: should capture correct error when response from service layer is null, Scenario: OR Condition", () => {
      const expectedRes = null;
      bmService.getBookMarkedArticles.mockReturnValue(Promise.resolve(expectedRes));
     
      cb = (error) => {
        console.log("ctrlGetBookMarkedArticles: error recieved: ", error);
        expect(error).toHaveProperty(
          "message",
          "Cannot set property 'data' of null"
        );
      };

      return bmController.ctrlGetBookMarkedArticles({}, null, cb)
        .then(() => {
          expect(bmService.getBookMarkedArticles).toHaveBeenCalledTimes(1);
        });
    });

    it("ctrlBookmarkArticle: should capture correct error when response from service layer is null", () => {
      const expectedRes = getAllBookMarkResData();
      bmService.bookmarkAnArticle.mockReturnValue(Promise.resolve(expectedRes));
     
      cb = (error) => {
        console.log("ctrlBookmarkArticle: error recieved: ", error);
        expect(error).toHaveProperty(
          "message",
          "Cannot set property 'data' of null"
        );
      };

      return bmController.ctrlBookmarkArticle({}, null, cb)
        .then(() => {
          expect(bmService.bookmarkAnArticle).toHaveBeenCalledTimes(1);
        });
    });

    it("ctrlUnBookmarkArticle: should capture correct error when response from service layer is null", () => {
      const expectedRes = getAllBookMarkResData();
      bmService.UnBookmarkAnArticle.mockReturnValue(Promise.resolve(expectedRes));
     
      cb = (error) => {
        console.log("ctrlUnBookmarkArticle: error recieved: ", error);
        expect(error).toHaveProperty(
          "message",
          "Cannot set property 'data' of null"
        );
      };

      return bmController.ctrlUnBookmarkArticle({}, null, cb)
        .then(() => {
          expect(bmService.UnBookmarkAnArticle).toHaveBeenCalledTimes(1);
        });
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
    console.log('************* Test Case End *************');
  });
});

getAllBookMarkResData = () => {
  return {
    "KFXCCCPKEBBDJOQNDJJAGTKOP4": {
      "type": "LISTEN"
    }
  }
}

postBookMarkResData = () => {
  return "Article Bookmarked Successfully"
}
delBookMarkResData = () => {
  return "Article Removed from Bookmarks Successfully"
}

delBookMarkResDataNegative1 = () => {
  return "Article not Removed from Bookmarks Successfully"
}