import { useEffect } from "react";
import baseStyle from "../../Base.module.css";
import GuidelineViolation from "../../../exceptions/GuidelineViolation/GuidelineViolation";
import { PROVIDE_TEXT_ALTERNATIVE_TO_FORM_IMAGE_BUTTONS } from "../../../utils/eMagGuidelineCode";
import RequiredAttribute from "../../../exceptions/RequiredAttribute";

/**
 * @typedef ImageButtonProps
 * 
 * @property {string} src
 * @property {string} alt
 * @property {number} width
 * @property {number} height
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
 * @param {ImageButtonProps} props
 * @returns 
 */
const ImageButton = ({
    src,
    alt,
    width = 100,
    height = 30
}) => {
    useEffect(()=>{
        if(!src){
            throw new RequiredAttribute("É necessário atribuir para a propriedade `src` qual a url da imagem.")
        }
        
        if(!alt){
            throw new GuidelineViolation(PROVIDE_TEXT_ALTERNATIVE_TO_FORM_IMAGE_BUTTONS, "Para botões gráficos (<input type='image'> deve-se informar um texto alternativo. O alt é importante para que os leitores de tela descrevam a imagem aos usuários.")
        }
    }, []);

    return (
        <input
            className={baseStyle.Highlight}
            type="image"
            width={width}
            height={height}
            src={src}
            alt={alt} />
    )
}

export default ImageButton;