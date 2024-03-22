class GuidelineViolation extends Error {
    constructor(guidelineCode, guidelineMessage, message){
       super(`Violação da diretriz ${guidelineCode} -  ${guidelineMessage} - ${message}`);
    }
}

export default GuidelineViolation;