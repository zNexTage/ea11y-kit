import BaseError from "./BaseError";

/**
 * Classe base para erros gerados em componentes 
 */
class ViolationBaseError extends BaseError {

    constructor(code, message, guidelineUrl = "https://emag.governoeletronico.gov.br/"){
        super(message);
        
        this.code = code;
        this.message = message;
        this.guidelineUrl = guidelineUrl;
    }

}

export default ViolationBaseError;