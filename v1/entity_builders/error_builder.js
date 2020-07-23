let errorBuilder = function (err) {
    try {
        function _build() {
            return Promise.all([_getErrMessages(), _getHttpCode()]).then(vaules => {
                const err_message = vaules[0]
                const err_code = vaules[1]
                const err_type = err.name.replace('Sequelize', '')
                let error_obj = {
                    code: err_code,
                    body: {
                        type: err_type,
                        messages: err_message
                    }
                }
                if (err.name === 'ReferenceError' || err.name === 'TypeError') {
                    error_obj.body.stack = err.stack
                    return error_obj
                } else {
                    return error_obj
                }
            })
        }

        var _getHttpCode = function () {
            return new Promise(function (resolve, reject) {
                if (err.isJoi) {
                    resolve(400)
                } else if (err.name === 'SequelizeValidationError') {
                    resolve(422)
                } else if (['ReferenceError', 'SequelizeForeignKeyConstraintError', 'TypeError', 'SyntaxError', 'RangeError', 'SequelizeDatabaseError'].indexOf(err.name) != -1) {
                    resolve(500)
                } else {
                    resolve(err.code || 500)
                }
            })
        }

        var _getErrMessages = function () {
            return new Promise(function (resolve, reject) {
                let err_details = err.errors || err.details || err.message
                if (err_details === "aggregate error") {
                    err_details = err[0].errors.message
                }
                if (Array.isArray(err_details)) {
                    let messages = []
                    err_details.forEach(e => {
                        messages.push(e.message.replace(new RegExp('"', 'g'), "'"))
                    })
                    resolve(messages || 'Please check System Log for more info')
                } else {
                    resolve(err_details.replace(new RegExp('"', 'g'), "'"))
                }
            })
        }

        return _build().catch(err => {
            return {
                code: 422,
                body: {
                    type: 'Execution Error',
                    messages: err.message || err.errors || err.details
                }
            }
        })
    } catch (err) {
        return {
            code: 500,
            body: {
                type: 'Unhandeled Error',
                messages: `Unhandeled Error in Error builder module: ${err}`
            }
        }
    }
}

module.exports = errorBuilder
