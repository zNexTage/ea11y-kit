import BaseError from "./BaseError";

/**
 * Classe base para erros gerados em componentes 
 */
class ViolationBaseError extends BaseError {

    constructor(code, message){
        this.code = code;
        this.message = message;

        super(message);
    }

}

export default ViolationBaseError;