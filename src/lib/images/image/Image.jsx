import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ComponentErrorList from "../../../components/component-error-list/ComponentErrorList";
import GuidelineViolation from "../../../exceptions/GuidelineViolation/GuidelineViolation";
import { PROVIDE_TEXT_ALTERNATIVE_TO_WEBSITE_IMAGES } from "../../../utils/eMagGuidelineCode";


/**
 * Componente Image pré-configurado com as diretrizes do eMAG
 * 
 * Diretrizes adotadas:
 * 
 * Recomendação 3.6 – Fornecer alternativa em texto para as imagens do sítio: "Deve ser fornecida uma descrição para as imagens da página, utilizando-se, 
 * para tanto o atributo alt."
 * portanto, o atributo alt é obrigatório.
 * 
 * @param {HTMLImageElement} props 
 * @returns {React.JSX.Element}
 */
const Image = ({ src, alt, ...extraProps }) => {
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const errorsAux = [];

        if (!alt) {
            errorsAux.push(new GuidelineViolation(PROVIDE_TEXT_ALTERNATIVE_TO_WEBSITE_IMAGES, 'O atributo `alt` é obrigatório e deve ser informado para que leitores de tela possam descrever a imagem para os usuários.'));
        }

        setErrors([...errorsAux]);
    }, []);

    return (
        <>
            {errors.length === 0 &&
                <img
                    {...extraProps}
                    src={src}
                    alt={alt}
                />
            }

            {errors.length > 0 && <ComponentErrorList errors={errors} />}
        </>
    )
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    extraProps: PropTypes.object //TODO: Há um tipo mais adequado para essa prop? 
}

export default Image;