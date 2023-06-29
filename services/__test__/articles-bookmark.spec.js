
const bmService = require('../articles-bookmark');
const bmModel = require("../../models/articles-bookmark");
const customErrors = require("../../helpers/customErrors");
const { ADMIN_ERROR_MSG, ARTICLE_BOOKMARKED_SUCCESSFULLY, ARTICLE_UNBOOKMARKED_SUCCESSFULLY } = require("../../helpers/constants");

jest.mock('../../models/articles-bookmark', () => ({
  ...jest.mock('../../models/articles-bookmark'),
  receiveBookMarkedArticles: jest.fn(),
  bookmarkArticle: jest.fn(),
  deleteBookMarkedArticle: jest.fn()
}));


describe("The Bookmark Article Modules Service", () => {

  beforeEach(() => {
    jest.resetModules();
    console.log('************* Test Case Begin *************');
  });

  describe("The get Bookmark Article  Service Api", () => {
    it("should return correct Bookmarked Article from the model layer", async () => {
      const expected = getAllBookMarkResData();
      bmModel.receiveBookMarkedArticles.mockReturnValue(Promise.resolve(expected));
      const actual = await bmService.getBookMarkedArticles();
      console.log("Bookmark Article Service Response: ", JSON.stringify(actual));
      expect(bmModel.receiveBookMarkedArticles).toHaveBeenCalledTimes(1);
      expect(actual).toBe(expected);
    });
  });

  describe("The post Bookmark Service Api", () => {
    it("should update correct Bookmarked Articles through the model layer1", () => {
      const expected = postBookMarkResData();
      const req = reqBookMarkArticle();
      bmModel.bookmarkArticle.mockReturnValue(Promise.resolve(expected));
      return bmService.bookmarkAnArticle(req, {}, {})
        .then((actual) => {
          expect(bmModel.bookmarkArticle).toHaveBeenCalledTimes(1);
          expect(actual).toBe(ARTICLE_BOOKMARKED_SUCCESSFULLY);
          console.log("Follow Todpics Service Post Response: ", actual);
        });
    });
  });

  // exports.UnBookmarkAnArticle = async (req) => {
  //   const { uid, body: { id } } = req;
  //   try {
  //     await deleteBookMarkedArticle(uid, id);
  //     return ARTICLE_UNBOOKMARKED_SUCCESSFULLY;
  //   }
  //   catch (error) {
  //     console.log("error :", error, error?.errors?.[0]?.message);
  //     throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  //   }
  // }

  describe("The delete Bookmark Service Api", () => {
    it("should remove correct Bookmarked Articles through the model layer1", () => {
      const expected = delBookMarkResData();
      const req = reqUnBookMarkArticle();
      bmModel.deleteBookMarkedArticle.mockReturnValue(Promise.resolve(expected));
      return bmService.UnBookmarkAnArticle(req, {}, {})
        .then((actual) => {
          expect(bmModel.deleteBookMarkedArticle).toHaveBeenCalledTimes(1);
          expect(actual).toBe(ARTICLE_UNBOOKMARKED_SUCCESSFULLY);
          console.log("Follow Todpics Service Post Response: ", actual);
        });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.log('************* Test Case End *************');
  });
});

reqUnBookMarkArticle = () => {
  return {
    body: {
      "id": "U3TPJ6FDSJE2VKLBITWDHBYYU"
    }
  }
}

reqBookMarkArticle = () => {
  return {
    body: {
      "item":
      {
        "id": "U3TPJ6FDSJE2VKLBITWDHBYYU",
        "title": "Boeing Moved to Fix 777 Engine Covers Before Failures",
        "publish_date": "2021-06-10T12:50:16.569Z"
      },
      "img": {
      }
    }
  }
}

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
  return ARTICLE_UNBOOKMARKED_SUCCESSFULLY
}

