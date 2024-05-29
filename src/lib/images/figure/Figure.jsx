
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Image from "../image";
import GuidelineViolation from "../../../exceptions/GuidelineViolation/GuidelineViolation";
import { PROVIDE_TEXT_ALTERNATIVE_TO_WEBSITE_IMAGES } from "../../../utils/eMagGuidelineCode";
import ComponentErrorList from "../../../components/component-error-list";

/**
 * @typedef ImageProps
 * @property {string} caption
 * @property {HTMLImageElement} imgProps
 */


/**
 * Componente Figure para renderização de imagens com legendas.
 * 
 * Diretrizes adotadas:
 * 
 * 3.6 – Fornecer alternativa em texto para as imagens do sítio: "Deve ser fornecida uma descrição para as imagens da página, utilizando-se, 
 * para tanto o atributo alt." portanto, o atributo alt é obrigatório.
 * 
 * 
 * @param {ImageProps} props
 * @returns 
 */
const Figure = ({ imgProps, caption }) => {

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const errorsAux = [];

        if (!imgProps?.alt) { // informou o texto alternativo para a imagem? 
            errorsAux.push(new GuidelineViolation(PROVIDE_TEXT_ALTERNATIVE_TO_WEBSITE_IMAGES, 'O atributo `alt` é obrigatório e deve ser informado para que leitores de tela possam descrever a imagem para os usuários.'));
        }

        if (!caption) { // informou a legenda para a imagem?
            errorsAux.push(new GuidelineViolation(PROVIDE_TEXT_ALTERNATIVE_TO_WEBSITE_IMAGES, 'O atributo `caption` (legenda) é obrigatório e deve ser informado para descrever com mais detalhes o conteúdo da imagem.'));
        }

        setErrors([...errorsAux]);
    }, [caption, imgProps]);

    return (
        <>
            {errors.length === 0 &&
                <figure>
                    <Image {...imgProps} />
                    <figcaption>
                        {caption}
                    </figcaption>
                </figure>
            }

            {errors.length > 0 &&
                <ComponentErrorList errors={errors} />
            }
        </>
    )
}

Figure.propTypes = {
    imgProps: PropTypes.instanceOf(HTMLImageElement),
    caption: PropTypes.string.isRequired
};

export default Figure;