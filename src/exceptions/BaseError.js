/**
 * Classe base para erros gerados em componentes 
 */
class BaseError {

    constructor(code, message){
        this.code = code;
        this.message = message;
    }

}

export default BaseError;