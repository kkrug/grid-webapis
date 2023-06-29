const listController = require("../list");
const listService = require("../../services/list");
const constants = require("../../helpers/constants");

jest.mock("../../services/list", () => ({
  ...jest.mock("../../services/list"),
  getAllListAndItems: jest.fn(),
  createAList: jest.fn(),
  deleteAList: jest.fn(),
  deleteItemFromList: jest.fn(),
  addItem: jest.fn(),
  getItems: jest.fn(),
  deleteItem: jest.fn(),
}));

describe("The list Modules Controller", () => {
  beforeEach(() => {
    jest.resetModules();
    console.log("************* Test Case Begin *************");
  });
  describe("The post item to list Controller Api", () => {
    it("should add item to list correctly through the service layer1", () => {
      const expectedRes = addItemToListPositiveResponse();
      const actualRes = {};
      listService.addItem.mockReturnValue(Promise.resolve(expectedRes.data));
      cb = () => {
        expect(actualRes.data).toBe(expectedRes.data);
        expect(constants.SUCCESS).toBe(actualRes.message);
        console.log("Test Data: ", JSON.stringify(actualRes));
      };
      return listController
        .ctrlAddItemToList(addItemToListReqBody(), actualRes, cb)
        .then(() => {
          expect(listService.addItem).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("The post create list Controller Api", () => {
    it("should create the list with given name correctly through the service layer1", () => {
      const expectedRes = createListPositiveResponse();
      const actualRes = {};
      listService.createAList.mockReturnValue(
        Promise.resolve(expectedRes.data)
      );
      cb = () => {
        expect(actualRes.data).toBe(expectedRes.data);
        expect(constants.SUCCESS).toBe(actualRes.message);
        console.log("Test Data: ", JSON.stringify(actualRes));
      };
      return listController
        .ctrlCreateList(createListRequestBody(), actualRes, cb)
        .then(() => {
          expect(listService.createAList).toHaveBeenCalledTimes(1);
        });
    });
  });

  exports.ctrlDeleteList = async (req, res, next) => {
    try {
      validateInputs(req);
      const resData = await deleteAList(req);
      res.data = resData;
      res.message = constants.SUCCESS;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  describe("The delete list Controller Api", () => {
    it("should delete the list with given name correctly through the service layer1", () => {
      const expectedRes = deleteListPositiveResponse();
      const actualRes = {};
      listService.deleteAList.mockReturnValue(
        Promise.resolve(expectedRes.data)
      );
      cb = () => {
        expect(actualRes.data).toBe(expectedRes.data);
        expect(constants.SUCCESS).toBe(actualRes.message);
        console.log("Test Data: ", JSON.stringify(actualRes));
      };
      return listController
        .ctrlDeleteList(createListRequestBody(), actualRes, cb)
        .then(() => {
          expect(listService.deleteAList).toHaveBeenCalledTimes(1);
        });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.log("************* Test Case End *************");
  });
});

addItemToListReqBody = () => {
  return {
    item: {
      id: "NVCXZBU7KVFRBAHXDGCOX75TH4",
    },
  };
};
addItemToListPositiveResponse = () => {
  return {
    responseCode: 200,
    status: true,
    message: "success",
    data: "item added Successfully",
  };
};

createListRequestBody = () => {
  return {
    body: {
      name: "Epic Ideas",
    },
  };
};

createListPositiveResponse = () => {
  return {
    responseCode: 200,
    status: true,
    message: "success",
    data: "list Created Successfully",
  };
};

deleteListPositiveResponse = () => {
  return {
  "responseCode": 200,
  "status": true,
  "message": "success",
  "data": "list Deleted Successfully"
}
  }

//test ccmmit to check auto deployment with grid repo - develop
