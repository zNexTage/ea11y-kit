class AggregateError extends Error {


    /**
     * 
     * @param {Array<BaseError>} errors 
     */
    constructor(errors) {
        super("");
        let message = "Atenção! Foi identificado os seguintes problemas: \n";
        this.errors = [...errors];
        message += this.getErrorMessages().join("\n");
        
        this.message = message;
    }

    getErrorMessages() {
        return this.errors.map(error => error.message);
    }
}

export default AggregateError;