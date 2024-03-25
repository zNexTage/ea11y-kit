import { useEffect, useState } from "react"
import GuidelineViolation from "../../../exceptions/GuidelineViolation/GuidelineViolation";
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
            errorsAux.push(new GuidelineViolation(ASSOCIATE_TAGS_WITH_YOUR_FIELDS, "É essencial que todos os campos de entrada, como caixas de texto, caixas de seleção (checkbox), botões de rádio (radio button), entre outros, tenham uma etiqueta (label) associada. A etiqueta fornece uma descrição clara do propósito do campo, o que é fundamental para orientar todos os usuários, especialmente aqueles com dificuldades visuais que dependem de leitores de tela. Quando os usuários focam em um campo de entrada, o leitor de tela deve ler a etiqueta para fornecer a devida orientação."));           
        }

        if (!id) {
            // Violou a diretriz 6.2. Não informou o id.
            errorsAux.push(new GuidelineViolation(ASSOCIATE_TAGS_WITH_YOUR_FIELDS, "Para associar corretamente uma etiqueta (label) a um campo de texto e contextualizá-lo, é fundamental fornecer a propriedade 'id' correspondente"));
        }

        setErrors(errorsAux);
    }, [id, label]);

    return errors;
}

export default useFieldValidations;