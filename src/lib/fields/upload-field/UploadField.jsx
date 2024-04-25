import { useEffect, useState } from "react";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import baseStyle from "../BaseField.module.css";
import style from "./UploadField.module.css";
import ComponentErrorList from "../../../components/component-error-list";
import DownloadLink from "../../links/download-link";

/**
 * @typedef UploadFieldProps
 * @property {string} id
 * @property {string} label
 * @property {boolean} isRequired
 * @property {string} accept
 * @property {string} acceptDescription
 */

/**
 * Campo de entrada para anexo de arquivos configurado com as diretrizes do eMAG
 * 
 * Diretrizes adotadas:
 * 
 * Recomendação 3.5 – Descrever links clara e sucintamente
 * - Ao listar os arquivos anexados, é demonstrado o nome do arquivo, a extensão e o tamanho do arquivo no próprio texto do link.
 * 
 * Recomendação 4.4 – Possibilitar que o elemento com foco seja visualmente evidente
 * - Ao receber foco é aplicado uma borda vermelha de 2px do tipo solid no campo. Além da borda, foi reforçado o destaque do componente através do atributo outline.
 * 
 * Recomendação 6.2 – Associar etiquetas aos seus campos: 
 *  - A propriedade id é obrigatório, e é utilizado para vincular a label ao campo e identificar o input;
 * 
 * * Recomendação 6.5 – Fornecer instruções para entrada de dados: 
 *  - Para os campos obrigatórios é adicionado a informação *campo obrigatório* a frente da label para que
 * leitores de telas possam comunicar ao usuário que o campo precisa ser preenchido; 
 * - A propriedade acceptDescription descreve para o usuário quais arquivos ele pode anexar;
 * 
 * Parâmetros:
 * - id: Permite identificar o input e associá-lo a label;
 * - label: Etiqueta que diz ao que usuário o que ele deve anexar;
 * - isRequired: define se o anexo é obrigatório ou não;
 * - accept: define as extensões aceitas. Deve-se informar uma string e separar cada extensão utilizando vírgulas. Ex: image/png, image/jpeg. 
 * Para mais detalhes, acesse: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
 * - acceptDescription: descrição para ajudar o usuário a saber quais arquivos ele pode anexar. 
 * - multiple: define se pode anexar mais de um arquivo.
 * @param {UploadFieldProps} props
 * @returns 
 */
const UploadField = ({
    id,
    label,
    isRequired,
    accept,
    acceptDescription,
    multiple,
}) => {
    const [errors, setErrors] = useState([]);
    const [files, setFiles] = useState([]);

    const violations = useFieldValidations(label, id);

    useEffect(() => {
        const textFieldViolations = [...violations];

        setErrors([...textFieldViolations]);
    }, [violations]);

    /**
     * Captura o evento Change do input e atualiza o estado files com os arquivos enviados
     * @param {React.ChangeEvent<HTMLInputElement>} event 
     */
    const onChange = event => {
        files.forEach(file => URL.revokeObjectURL(file.url));

        const newFiles = [].slice.call(event.target.files);

        const normalizedFiles = newFiles.map(file => getUploadFileInfos(file));

        setFiles(_ => [...normalizedFiles]);
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
                errors.length == 0 &&
                <>
                    <label htmlFor={id}>
                        {isRequired ? <>{label}&nbsp;<small>(campo obrigatório)</small></> : label}
                    </label>

                    <input
                        multiple={multiple}
                        onChange={onChange}
                        id={id}
                        accept={accept}
                        type="file"
                        className={`${baseStyle.field} ${style.UploadField}`}
                    />
                    <span>
                        {
                            accept &&
                            <small>
                                {acceptDescription}
                            </small>
                        }
                    </span>
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
                </>
            }
            {errors.length > 0 && <ComponentErrorList errors={errors} />}
        </div>

    )
}

export default UploadField;