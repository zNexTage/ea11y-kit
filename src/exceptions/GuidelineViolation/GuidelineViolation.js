import guidelineMessages from "../../utils/eMagGuidelineMessage";
import ViolationBaseError from "../ViolationBaseError";

class GuidelineViolation extends ViolationBaseError {

    constructor(code, message) {
        super(code, `Violação da diretriz ${code} - ${guidelineMessages.get(code)}. ${message}`);
    }
}




export default GuidelineViolation;