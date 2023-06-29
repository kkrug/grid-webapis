module.exports = {
    summitError: (httpStatus, message, code) => {
        return {
            httpStatus,
            error: new Error(message),
            code
        };
    }
}