import guidelineMessages from "../../utils/eMagGuidelineMessage";
import BaseError from "../BaseError";

class GuidelineViolation extends BaseError {

    constructor(code, message) {
        super(code, `Violação da diretriz ${code} - ${guidelineMessages.get(code)}. ${message} Acesse a ferramenta de desenvolvimento do navegador pressionando F12 para verificar mais detalhes.`);
    }
}




export default GuidelineViolation;