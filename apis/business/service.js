class Methods {
    
    static getInstance() {
        if (!Methods.instance) {
            Methods.instance = new Methods();
        }

        return Methods.instance;
    }

     healthCheck() {
        return "App is running successfully";
    }

}

module.exports = Methods;