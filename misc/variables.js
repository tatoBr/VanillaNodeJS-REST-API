module.exports = {
    HTTP_STATUS_CODE_LIST: {
        "OK": {
            codeNumber: 200,
            description: "Standard response for successful HTTP requests. The actual response will depend on the request method used. In a GET request, the response will contain an entity corresponding to the requested resource. In a POST request, the response will contain an entity describing or containing the result of the action."
        },
        "CREATED" : {
            codeNumber: 201,
            description: "The request has been fulfilled, resulting in the creation of a new resource."
        },
        "BAD_REQUEST": {
            codeNumber: 400,
            description: "The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing)."
        },
        "NOT_FOUND": {
            codeNumber: 404,
            description: "The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible."
        },
        "INTERNAL_SERVER_ERROR": {
            codeNumber: 500,
            description: "A generic error message, given when an unexpected condition was encountered and no more specific message is suitable."
        }        
    },
    PATH: {
        "usuarios": "/api/usuarios"       
    }
};
Object.freeze( this ); 