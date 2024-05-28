import {
    ASSOCIATE_TAGS_WITH_YOUR_FIELDS,
    PROVIDE_INSTRUCTIONS_FOR_DATA_ENTRY,
    DESCRIBE_LINKS_CLEARLY_AND_SUCCINCTLY,
    PROVIDE_TEXT_ALTERNATIVE_TO_WEBSITE_IMAGES
} from "./eMagGuidelineCode";

const guidelineMessages = new Map();

guidelineMessages.set(ASSOCIATE_TAGS_WITH_YOUR_FIELDS, "Associar etiquetas aos seus campos");
guidelineMessages.set(PROVIDE_INSTRUCTIONS_FOR_DATA_ENTRY, "Fornecer instruções para entrada de dados");
guidelineMessages.set(DESCRIBE_LINKS_CLEARLY_AND_SUCCINCTLY, "Descrever links clara e sucintamente");
guidelineMessages.set(PROVIDE_TEXT_ALTERNATIVE_TO_WEBSITE_IMAGES, "Fornecer alternativa em texto para as imagens do sítio");

export default guidelineMessages;