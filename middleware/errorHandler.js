const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "validation failed",
                message: err.message,
                stackTrace: err.stack,
            });
            return; // Add return here to exit the function

        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
            return; // Add return here to exit the function

        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
            return; // Add return here to exit the function

        case constants.SERVER_ERROR:
            res.json({
                title: "server error",
                message: err.message,
                stackTrace: err.stack,
            });
            return; // Add return here to exit the function

        default:
            console.log("chill dude, all good");
            break;
    }

    // If none of the cases matched, send a default response
    res.json({
        title: "not found",
        message: err.message,
        stackTrace: err.stack,
    });
};

module.exports = errorHandler;
