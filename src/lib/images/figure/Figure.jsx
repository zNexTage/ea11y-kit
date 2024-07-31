
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import GuidelineViolation from "../../../exceptions/GuidelineViolation/GuidelineViolation";
import { PROVIDE_TEXT_ALTERNATIVE_TO_WEBSITE_IMAGES } from "../../../utils/eMagGuidelineCode";
import ComponentErrorList from "../../../components/component-error-list";
import { styled } from "@stitches/react";

/**
 * @typedef FigureProps
 * @property {string} caption
 * @property {React.ReactNode} children
 * @property {import("@stitches/react").CSS} css
 */


/**
 * @typedef {FigureProps & React.HTMLProps<HTMLElement>} ExtendedFigureProps
 */

const FigureStyled = styled("figure", {
    border: "thin #c0c0c0 solid",
    display: "flex",
    flexFlow: "column",
    margin: "auto",
    width: "100%",
    height: "100%",
    padding: 5
});

const FigcaptionStyled = styled("figcaption", {
    backgroundColor: "#222",
    color: "#fff",
    padding: "3px",
    textAlign: "center"
})

/**
 * Componente Figure para renderização de imagens com legendas.
 * 
 * Diretrizes adotadas:
 * 
 * 3.6 – Fornecer alternativa em texto para as imagens do sítio: "Deve ser fornecida uma descrição para as imagens da página, utilizando-se, 
 * para tanto o atributo alt." portanto, o atributo alt e caption são obrigatórios.
 * 
 * 
 * @param {ExtendedFigureProps} props
 * @returns 
 */
const Figure = ({ caption, children, css, ...rest }) => {

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const errorsAux = [];

        if (!caption) { // informou a legenda para a imagem?
            errorsAux.push(new GuidelineViolation(PROVIDE_TEXT_ALTERNATIVE_TO_WEBSITE_IMAGES, 'O atributo `caption` (legenda) é obrigatório e deve ser informado para descrever com mais detalhes o conteúdo da imagem.'));
        }

        setErrors([...errorsAux]);
    }, [caption]);


    return (
        <>
            {errors.length === 0 &&
                <FigureStyled css={css} {...rest}>
                    {children}
                    <FigcaptionStyled>
                        {caption}
                    </FigcaptionStyled>
                </FigureStyled>
            }

            {errors.length > 0 &&
                <ComponentErrorList errors={errors} whichComponent="Figure" />
            }
        </>
    )
}

Figure.propTypes = {
    caption: PropTypes.string,
    children: PropTypes.node,
    css: PropTypes.object
};

export default Figure;