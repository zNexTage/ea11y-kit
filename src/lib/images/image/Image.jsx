import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ComponentErrorList from "../../../helper-components/component-error-list/ComponentErrorList";
import GuidelineViolation from "../../../exceptions/GuidelineViolation/GuidelineViolation";
import { PROVIDE_TEXT_ALTERNATIVE_TO_WEBSITE_IMAGES } from "../../../utils/eMagGuidelineCode";
import { styled } from "@stitches/react";


const ImageStyled = styled("img", {});

/**
 * @typedef ImageProps
 * @property {import("@stitches/react").CSS} css
 */

/**
 * Componente Image pré-configurado com as diretrizes do eMAG
 * 
 * Diretrizes adotadas:
 * 
 * Recomendação 3.6 – Fornecer alternativa em texto para as imagens do sítio: "Deve ser fornecida uma descrição para as imagens da página, utilizando-se, 
 * para tanto o atributo alt."
 * portanto, o atributo alt é obrigatório.
 * 
 * @param {React.HTMLProps<HTMLImageElement> & ImageProps} props 
 * @returns {React.JSX.Element}
 */
const Image = ({ src, alt, css, ...extraProps }) => {
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const errorsAux = [];

        if (!alt) {
            errorsAux.push(new GuidelineViolation(PROVIDE_TEXT_ALTERNATIVE_TO_WEBSITE_IMAGES, 'O atributo `alt` é obrigatório e deve ser informado para que leitores de tela possam descrever a imagem para os usuários.'));
        }

        setErrors([...errorsAux]);
    }, [alt]);

    return (
        <>
            {errors.length === 0 &&
                <ImageStyled
                    {...extraProps}
                    src={src}
                    alt={alt}
                    css={css}
                />
            }

            {errors.length > 0 && <ComponentErrorList errors={errors} whichComponent="Image" />}
        </>
    )
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    extraProps: PropTypes.object //TODO: Há um tipo mais adequado para essa prop? 
}

export default Image;