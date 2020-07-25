exports.recordNotFoundError = function (message) {
    error = new Error()
    error.name = 'Record Not Found'
    error.message = message
    error.code = 404
    return error
}

exports.unprocessableEntityError = function (message) {
    error = new Error()
    error.name = 'Unprocessable Data'
    error.message = message
    error.code = 422
    return error
}

exports.conflictError = function (message) {
    error = new Error()
    error.name = 'conflict Error'
    error.message = message
    error.code = 409
    return error
}

exports.unauthorizedError = function (message) {
    error = new Error()
    error.name = 'Unauthorized Action'
    error.message = message
    error.code = 403
    return error
}
