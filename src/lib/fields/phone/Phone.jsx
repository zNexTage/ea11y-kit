import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import RequiredAttribute from "../../../exceptions/RequiredAttribute";
import InvalidAttribute from "../../../exceptions/InvalidAttribute";
import ComponentErrorList from "../../../components/component-error-list";
import { fieldCss, fieldHightlight } from "../shared-styles/Field.style";
import { lightTheme } from "../../../stitches.config";
import { styled } from "@stitches/react";
import { PROVIDE_INSTRUCTIONS_FOR_DATA_ENTRY } from "../../../utils/eMagGuidelineCode";
import GuidelineViolation from "../../../exceptions/GuidelineViolation/GuidelineViolation";

const PHONE_LANDLINE_MIN_LENGTH = 12;
const PHONE_CELLPHONE_MIN_LENGTH = 13;

const WHICH_FORMAT_BOTH = "both";
const WHICH_FORMAT_PHONE = "phone";
const WHICH_FORMAT_CELLPHONE = "cellphone";


/**
 * @typedef PhoneProps
 * @property {import("@stitches/react").CSS} css
 * @property {'cellphone'|'phone'|'both'} whichFormat
 */

/**
 * @typedef {PhoneProps & React.HTMLProps<HTMLInputElement>} ExtendedPhoneProps
 */

const PhoneStyled = styled("input", {});

/**
 * Campo de entrada para telefone fixo e/ou celulares pré-configurado com as diretrizes do eMAG
 * 
 * Diretrizes adotadas:
 * 
 * Recomendação 4.4 – Possibilitar que o elemento com foco seja visualmente evidente
 * - Ao receber foco é aplicado uma borda vermelha de 2px do tipo solid no campo de texto.
 * Além da borda, foi reforçado o destaque do componente através do atributo outline.
 * 
 * Recomendação 6.2 – Associar etiquetas aos seus campos: 
 *  - O atributo id é obrigatório, e é utilizado para vincular a label ao campo de texto e identificar o input;
 * 
 * Recomendação 6.5 – Fornecer instruções para entrada de dados: 
 *  - Para os campos obrigatórios é adicionado a informação *campo obrigatório* a frente da label para que
 * leitores de telas possam comunicar ao usuário que o campo precisa ser preenchido;
 * - É indicado a frente da label o formato que deve-se se inserir no campo (telefone: 00 0000-0000 / celulares: 00 00000-0000);
 * 
 * 
 * O componente é renderizado apenas se estiver de acordo com as diretrizes do eMAG. Caso não esteja,
 * será renderizado uma lista contendo quais diretrizes foram violadas.
 * 
 * @param {ExtendedPhoneProps} props 
 * @returns 
 */
const Phone = ({
    required = false,
    whichFormat = WHICH_FORMAT_BOTH,
    label,
    placeholder,
    name,
    css,
    id,
    onChange,
    onPaste,
    ...rest
}) => {
    const [currentValue, setCurrentValue] = useState("");

    const violations = useFieldValidations(label, id);

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const errorsAux = [...violations];

        if (!name) {
            errorsAux.push(
                new RequiredAttribute(`É necessário especificar o nome (name) do campo. O atributo name é usado como referência quando os dados são enviados (https://www.w3schools.com/tags/att_name.asp).`)
            );
        }

        if (!whichFormat in [WHICH_FORMAT_BOTH, WHICH_FORMAT_CELLPHONE, WHICH_FORMAT_PHONE]) {
            errorsAux.push(
                new InvalidAttribute(`Os formatos permitidos são: ${WHICH_FORMAT_BOTH}, ${WHICH_FORMAT_CELLPHONE} e ${WHICH_FORMAT_PHONE}.`)
            );
        }

        if(!placeholder){
            errorsAux.push(
                new GuidelineViolation(PROVIDE_INSTRUCTIONS_FOR_DATA_ENTRY, `É necessário especificar uma dica para o campo de texto (placeholder). É importante informar uma dica, pois leitores de tela leem a dica e comunicam aos usuários.`)
            );
        }

        setErrors([...errorsAux]);
    }, [name, violations, placeholder, whichFormat]);

    /**
     * Formata o valor de entrada para 00 00000-0000
     * @param {string} value 
     * @returns {string}
     */
    const cellphoneRegexFormat = value => {
        return value
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1')
    }

    /**
     * Formata o valor de entrada para 00 0000-0000
     * @param {string} value 
     * @returns {string}
     */
    const phoneRegexFormat = value => {
        return value
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1')
    }

    /**
     * Formata o DDD no número de telefone informado
     * @param {string} value Número de telefone enviado pelo usuário
     * @returns {string}
     */
    const formatDdd = value => {
        const formated = value
            .replace(/[^0-9]/g, "")
            .slice(0, 11);

        return formated.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1 $2');
    }

    /**
     * Verifica se um número de telefone é referente a um celular
     * @param {string} phoneNumber 
     */
    const isCellphoneNumber = (phoneNumber) => {
        const [ddd, number] = phoneNumber.split(" ");

        if (!number) return false;

        return number.startsWith("9");
    }

    const getFormattedValue = value => {
        let result = formatDdd(value);

        if (whichFormat === WHICH_FORMAT_BOTH) {
            // aplica o formato de telefone fixo apenas quando o número de caracteres
            // for menor ou igual a um número de telefone fixo comum.
            if (!isCellphoneNumber(result)) {
                result = phoneRegexFormat(result);
            }
            // caso o número informado seja maior que o de telefone fixo, 
            // significa que se trata de um número de celular.
            else {
                result = cellphoneRegexFormat(result);
            }
        }

        if (whichFormat === WHICH_FORMAT_CELLPHONE) {
            result = cellphoneRegexFormat(result);
        }

        if (whichFormat === WHICH_FORMAT_PHONE) {
            result = phoneRegexFormat(result);
        }

        return result;
    }

    /**
     * Formata o valor digitado pelo usuário para o formato de número de telefone fixo ou celular.
     * @param {React.ChangeEvent<HTMLInputElement>} event 
     */
    const onChangePhone = event => {
        const inputValue = event.target.value;

        const result = getFormattedValue(inputValue);

        setCurrentValue(result);

        // passa para onChange o valor formatado
        event.target.value = result;
        onChange && onChange(event);
    }

    /**
     * Define o tamanho mínimo que o campo deve suportar de acordo com o formato
     * do número digitado. 
     * Fixo: mínimo de 12 caracteres;
     * Celular: mínimo de 13 caracteres.
     * @returns {number}
     */
    const getMinLength = () => {
        if (whichFormat == "both" || whichFormat === "phone") {
            return PHONE_LANDLINE_MIN_LENGTH;
        } else {
            return PHONE_CELLPHONE_MIN_LENGTH;
        }
    }

    /**
     * Retorna qual formato o campo espera.
     * @returns {string}
     */
    const getAllowedFormatHelpText = () => {
        const CELLPHONE_FORMAT = "(00) 90000-0000";
        const LANDLINE_FORMAT = "(00) 0000-0000";

        const formats = {
            "both": `${CELLPHONE_FORMAT} / ${LANDLINE_FORMAT}`,
            "cellphone": CELLPHONE_FORMAT,
            "phone": LANDLINE_FORMAT
        }

        return formats[whichFormat];
    }

    /**
     * Formata o número colocado no campo de texto
     * @param {ClipboardEvent} event 
     */
    const onPastePhone = event => {
        const value = (event.clipboardData || window.clipboardData).getData("text");

        const phoneNumber = getFormattedValue(value);

        setCurrentValue(phoneNumber);

        // passa para onPaste o valor formatado.
        event.target.value = phoneNumber;
        onPaste && onPaste(event);
    }


    return (
        <>
            {errors.length === 0 && <div>
                <label htmlFor={id}>
                    {required ? <>{label}&nbsp;<small>(campo obrigatório)</small></> : label} <small>{getAllowedFormatHelpText()}</small>
                </label>
                <PhoneStyled
                    {...rest}
                    placeholder={placeholder}
                    name={name}
                    pattern={"[0-9]{2} [0-9]{4,6}-[0-9]{3,4}$"}
                    className={`${lightTheme} ${fieldCss} ${fieldHightlight}`}
                    css={css}
                    id={id}
                    type="tel"
                    required={required}
                    value={currentValue}
                    onChange={onChangePhone}
                    onPaste={onPastePhone}
                    minLength={getMinLength()}
                />
            </div>
            }

            {errors.length > 0 && <ComponentErrorList errors={errors} whichComponent="Phone" />}
        </>
    )
}

Phone.propTypes = {
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    whichFormat: PropTypes.oneOf([WHICH_FORMAT_BOTH, WHICH_FORMAT_CELLPHONE, WHICH_FORMAT_PHONE]).isRequired
}

export default Phone;