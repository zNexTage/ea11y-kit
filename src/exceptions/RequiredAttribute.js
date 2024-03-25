import { REQUIRED_ATTRIBUTE } from "../utils/ErrorCodes";
import BaseError from "./BaseError";

class RequiredAttribute extends BaseError{
    constructor(message){
        super(REQUIRED_ATTRIBUTE, message);
    }
};

export default RequiredAttribute;