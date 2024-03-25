import { useEffect, useState } from "react"
import { GuidelineViolation } from "../../../exceptions/GuidelineViolation/GuidelineViolation";
import { ASSOCIATE_TAGS_WITH_YOUR_FIELDS } from "../../../utils/eMagGuidelineCode";

/**
 * Validação para garantir conformidade com a diretriz: *6.2 – Associar etiquetas aos seus campos* 
 *  
 * Verifica se os parâmetros label e id forma informados. 
 * 
 * Recomendação 6.2 – Associar etiquetas aos seus campos: 
 *  - O atributo id e label é obrigatório, e é utilizado para vincular a label ao campo de texto e identificar o input.   
 * 
 * @param {string} label - Etiqueta (label) que deve ser especificada para um campo de entrada
 * @param {string} id - Identificador de um campo de entrada
 * @returns 
 */
const useFieldValidations = (label, id) => {
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const errorsAux = [];

        if (!label) {
            // Violou a diretriz 6.2. Não informou a etiqueta (label).
            errorsAux.push(new GuidelineViolation(ASSOCIATE_TAGS_WITH_YOUR_FIELDS, "Um campo de texto deve possuir uma label (etiqueta) que indique ao usuário o que ele deve inserir no campo. A label é importante para ajudar usuários com qualquer tipo de dificuldade visual, pois os leitores de tela irão ler o campo quando o usuário estiver focado no campo de texto."));           
        }

        if (!id) {
            // Violou a diretriz 6.2. Não informou o id.
            errorsAux.push(new GuidelineViolation(ASSOCIATE_TAGS_WITH_YOUR_FIELDS, "Para que a label (etiqueta) seja associado a um campo de texto e o contextualize, é necessário informar a propriedade id."));
        }

        setErrors(errorsAux);
    }, [id, label]);

    return errors;
}

export default useFieldValidations;