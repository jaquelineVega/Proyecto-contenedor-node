"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var APIStatusEnum;
(function (APIStatusEnum) {
    APIStatusEnum[APIStatusEnum["Success"] = 200] = "Success";
    APIStatusEnum[APIStatusEnum["Created"] = 201] = "Created";
    APIStatusEnum[APIStatusEnum["Bad_Request"] = 400] = "Bad_Request";
    APIStatusEnum[APIStatusEnum["Unauthorized"] = 401] = "Unauthorized";
    APIStatusEnum[APIStatusEnum["Internal_Server_Error"] = 500] = "Internal_Server_Error";
    APIStatusEnum[APIStatusEnum["Forbidden"] = 403] = "Forbidden";
})(APIStatusEnum = exports.APIStatusEnum || (exports.APIStatusEnum = {}));
;
exports.APIUtils = (ENV) => {
    return {
        BodyResponse: (status, description, message, result = null, error = null) => {
            return {
                microService: ENV.API.NAME,
                environment: ENV.API.ENVIRONMENT,
                status,
                description,
                message,
                result,
                error
            };
        }
    };
};
