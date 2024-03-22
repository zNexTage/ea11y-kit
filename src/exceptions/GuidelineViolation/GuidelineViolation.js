import guidelineMessages from "../../utils/eMagGuidelineMessage";

class GuidelineViolation extends Error {
    constructor(guidelineCode, message){        
       super(`Violação da diretriz ${guidelineCode} - ${guidelineMessages.get(guidelineCode)}: ${message} Acesse a ferramenta de desenvolvimento do navegador pressionando F12 para verificar mais detalhes.`);
    }
}

export default GuidelineViolation;