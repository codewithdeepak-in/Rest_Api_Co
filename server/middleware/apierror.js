class ApiError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}


const handleError = (err, res) => {
    const { statusCode, message } = err;
    res.status(statusCode).send({ statusCode, message });
};

module.exports = {
    ApiError,
    handleError
};
