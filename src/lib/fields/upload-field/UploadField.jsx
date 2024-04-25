import { useEffect, useState } from "react";
import useFieldValidations from "../../hooks/validations/useFieldValidations";
import baseStyle from "../BaseField.module.css";
import style from "./UploadField.module.css";
import ComponentErrorList from "../../../components/component-error-list";

const UploadField = ({
    label,
    id,
    isRequired,
    accept,
    acceptDescription
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