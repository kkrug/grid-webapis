const Methods = require("./service");
const { ResponseHandler, HttpCode } = require("../../helpers");

class Controller extends Methods {
    constructor () {
        super();
    }

    static getInstance() {
        if (!Controller.instance) {
            Controller.instance = new Controller();
        }
        return Controller.instance;
    }

     healthCheck(req, res, next) {
        try {
            console.log('controller')
            const msg =  super.healthCheck();
            return ResponseHandler.success(res, msg);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = Controller;
