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
     * Captura o evento Change do input
     * @param {React.ChangeEvent<HTMLInputElement>} event 
     */
    const onChange = event => {        
        const newFiles = [].slice.call(event.target.files);

        setFiles(files => [...newFiles]);
    }    


    return (
        <div>
            {
                errors.length == 0 &&
                <>
                    <label htmlFor={id}>
                        {isRequired ? <>{label}&nbsp;<small>(campo obrigatório)</small></> : label}
                    </label>

                    <input multiple onChange={onChange} id={id} accept={accept} type="file" className={`${baseStyle.field} ${style.UploadField}`} />
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
                                const fileUrl = URL.createObjectURL(file);

                                return (
                                    (
                                        <li key={`${file.name}_${index}`}>
                                            <a href={fileUrl} download>
                                                {file.name}
                                            </a>
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