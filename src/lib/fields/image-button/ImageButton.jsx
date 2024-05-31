import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import GuidelineViolation from "../../../exceptions/GuidelineViolation/GuidelineViolation";
import { PROVIDE_TEXT_ALTERNATIVE_TO_FORM_IMAGE_BUTTONS } from "../../../utils/eMagGuidelineCode";
import RequiredAttribute from "../../../exceptions/RequiredAttribute";
import ComponentErrorList from "../../../components/component-error-list";
import { fieldHightlight } from "../shared-styles/Field.style";
import { lightTheme } from "../../../stitches.config";

/**
 * @typedef ImageButtonProps * 
 * @property {import("@stitches/react").CSS} css
 */

/**
 * @typedef {ImageButtonProps & React.HTMLProps<HTMLInputElement>} ExtendedImageButtonProps
 */

/**
 * Botão gráfico para submissão de formulários configurados com as diretrizes do eMAG
 * 
 * Diretrizes adotadas:
 * 
 * **Recomendação 4.4 – Possibilitar que o elemento com foco seja visualmente evidente**
 * - Ao receber foco é aplicado uma borda vermelha de 2px do tipo solid no botão.
 * Além da borda, foi reforçado o destaque do componente através do atributo outline.
 * 
 * Recomendação 6.1 – Fornecer alternativa em texto para os botões de imagem de formulários
 * - De acordo com o eMAG: "Ao serem utilizados botões do tipo imagem (input type=”image”), 
 * que servem para o mesmo propósito do botão do tipo submit, deve ser fornecida uma descrição 
 * textual para o botão através do atributo alt.".  Este componente exige que seja informado o atributo alt.
 * 
 * @param {ExtendedImageButtonProps} props
 * @returns 
 */
const ImageButton = ({
    src,
    alt,
    css,
    ...rest
}) => {
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const errorsAux = [];

        if (!src) {
            errorsAux.push(new RequiredAttribute("É necessário atribuir para a propriedade `src` a url da imagem."));
        }

        if (!alt) {
            errorsAux.push(new GuidelineViolation(PROVIDE_TEXT_ALTERNATIVE_TO_FORM_IMAGE_BUTTONS, "Para botões gráficos (<input type='image'> deve-se informar um texto alternativo. O alt é importante para que os leitores de tela descrevam a imagem aos usuários."));
        }

        setErrors([...errorsAux]);
    }, []);

    return (
        <>
            {
                errors.length === 0 &&
                <input
                    {...rest}
                    className={`${lightTheme} ${fieldHightlight}`}
                    css={css}
                    type="image"
                    src={src}
                    alt={alt} />
            }

            {
                errors.length > 0 && <ComponentErrorList errors={errors} />
            }
        </>
    )
}

ImageButton.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    css: PropTypes.object
}

export default ImageButton;