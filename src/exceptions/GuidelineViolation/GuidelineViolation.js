import guidelineMessages from "../../utils/eMagGuidelineMessage";

class GuidelineViolation {

    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}

class GuidelineViolationError extends Error {
    violations = [];

    constructor(violations) {
        super();
        this.violations = violations;
        let message = "Violação das diretrizes do Modelo de Acessibilidade em Governo Eletrônico (eMAG)\n";
        message += this.getViolations().join("\n");
        
        this.message = message;
    }

    getViolations() {
        return this.violations.map(violation => `Violação da diretriz ${violation.code} - ${guidelineMessages.get(violation.code)}: ${violation.message} Acesse a ferramenta de desenvolvimento do navegador pressionando F12 para verificar mais detalhes.`);
    }
}



export { GuidelineViolation, GuidelineViolationError };