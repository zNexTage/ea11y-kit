import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import ComponentErrorList from "../../../helper-components/component-error-list";
import DownloadLink from "../../links/download-link";
import GuidelineViolation from "../../../exceptions/GuidelineViolation/GuidelineViolation";
import { PROVIDE_INSTRUCTIONS_FOR_DATA_ENTRY } from "../../../utils/eMagGuidelineCode";
import { fieldCss, fieldHightlight } from "../shared-styles/Field.style";
import { lightTheme } from "../../../stitches.config";
import { styled } from "@stitches/react";

/**
 * @typedef UploadFieldProps
 * @property {import("@stitches/react").CSS} css
 */

/**
 * @typedef {UploadFieldProps & React.HTMLProps<HTMLInputElement>} ExtendedUploadFileProps
 */

const UploadFieldStyled = styled("input", {
    border: "none"
});

/**
 * Campo de entrada para anexo de arquivos configurado com as diretrizes do eMAG
 * 
 * Diretrizes adotadas:
 * 
 * Recomendação 3.5 – Descrever links clara e sucintamente*
 * - Ao listar os arquivos anexados, é demonstrado o nome do arquivo, a extensão e o tamanho do arquivo no próprio texto do link.
 * 
 * Recomendação 4.4 – Possibilitar que o elemento com foco seja visualmente evidente**
 * - Ao receber foco é aplicado uma borda vermelha de 2px do tipo solid no campo. Além da borda, foi reforçado o destaque do componente através do atributo outline.
 * 
 * Recomendação 6.2 – Associar etiquetas aos seus campos:** 
 *  - A propriedade id é obrigatório, e é utilizado para vincular a label ao campo e identificar o input;
 * 
 * Recomendação 6.5 – Fornecer instruções para entrada de dados:** 
 *  - Para os campos obrigatórios é adicionado a informação *campo obrigatório* a frente da label para que
 * leitores de telas possam comunicar ao usuário que o campo precisa ser preenchido; 
 * - A propriedade acceptDescription descreve para o usuário quais arquivos ele pode anexar;
 * 
 * **Parâmetros:**
 * - id: Permite identificar o input e associá-lo a label;
 * - label: Etiqueta que diz ao usuário o que ele deve anexar;
 * - required: define se o anexo é obrigatório ou não;
 * - accept: define as extensões aceitas. Deve-se informar uma string e separar cada extensão utilizando vírgulas. Ex: image/png, image/jpeg. 
 * Para mais detalhes, acesse: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
 * - acceptDescription: descrição para ajudar o usuário a saber quais arquivos ele pode anexar. 
 * - multiple: define se pode anexar mais de um arquivo.
 * 
 * @param {ExtendedUploadFileProps} props
 * @returns 
 */
const UploadField = ({
    id,
    label,
    required,
    accept,
    acceptDescription,
    multiple,
    css,
    onChange,
    ...rest
}) => {
    const [errors, setErrors] = useState([]);
    const [files, setFiles] = useState([]);

    const violations = useFieldValidations(label, id);

    useEffect(() => {
        const uploadFieldViolations = [...violations];

        /**
         * ao informar os formatos de arquivos permitidos (accept) é necessário descrever ao usuário
         * quais extensões o campo aceitará.
        */
        if (accept && !acceptDescription) {
            uploadFieldViolations.push(
                new GuidelineViolation(PROVIDE_INSTRUCTIONS_FOR_DATA_ENTRY, "Ao informar a propriedade `accept`, é necessário informar a propriedade `acceptDescription`. Utiliza-se a propriedade `acceptDescription` para descrever ao usuário quais formatos de arquivo ele poderá anexar. Exemplo: Apenas imagens nos formatos PNG e JPG")
            )
        }

        setErrors([...uploadFieldViolations]);
    }, [violations, accept, acceptDescription]);

    /**
     * Captura o evento Change do input e atualiza o estado files com os arquivos enviados
     * @param {React.ChangeEvent<HTMLInputElement>} event 
     */
    const onChangeUploadField = event => {
        files.forEach(file => URL.revokeObjectURL(file.url));

        const newFiles = [].slice.call(event.target.files);

        const normalizedFiles = newFiles.map(file => getUploadFileInfos(file));

        setFiles(_ => [...normalizedFiles]);

        onChange && onChange(event);
    }

    /**
     * Obtém a url (temporária), extensão, tamanho e nome do arquivo.
     * @param {File} file 
     */
    const getUploadFileInfos = (file) => {
        const url = URL.createObjectURL(file);
        const extesion = file.type.split("/")[1];
        const size = Number.parseInt(file.size / 1000);
        const unit = "Kb";
        const name = file.name;

        return {
            url,
            extesion,
            size,
            unit,
            name
        }
    }

    return (
        <div>
            {
                errors.length === 0 &&
                <>
                    <label htmlFor={id}>
                        {required ? <>{label}&nbsp;<small>(campo obrigatório)</small></> : label}
                    </label>

                    <UploadFieldStyled
                        {...rest}
                        multiple={multiple}
                        onChange={onChangeUploadField}
                        id={id}
                        accept={accept}
                        type="file"
                        className={`${lightTheme} ${fieldCss} ${fieldHightlight}`}
                        css={css}
                        required={required}
                        {...rest}
                    />
                    {
                        accept &&
                        <span>
                            <small>
                                {acceptDescription}
                            </small>
                        </span>
                    }
                    {files.length > 0 &&
                        <div>
                            <ul>
                                {files.map((file, index) => {

                                    return (
                                        (
                                            <li key={`${file.name}_${index}`}>
                                                <DownloadLink
                                                    href={file.url}
                                                    extension={`.${file.extesion}`}
                                                    size={file.size}
                                                    fileName={file.name}
                                                    unit={file.unit}
                                                />
                                            </li>
                                        )
                                    )
                                })}
                            </ul>
                        </div>
                    }
                </>
            }
            {errors.length > 0 && <ComponentErrorList errors={errors} whichComponent="UploadField" />}
        </div>

    )
}

UploadField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    accept: PropTypes.string,
    acceptDescription: PropTypes.string,
    multiple: PropTypes.bool,
    css: PropTypes.object,
    onChange: PropTypes.func
}


export default UploadField;