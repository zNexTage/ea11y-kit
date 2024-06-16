import PropTypes from "prop-types";
import { useEffect, useState, forwardRef } from "react";
import GuidelineViolation from "../../../exceptions/GuidelineViolation/GuidelineViolation";
import { DESCRIBE_LINKS_CLEARLY_AND_SUCCINCTLY } from "../../../utils/eMagGuidelineCode";
import ComponentErrorList from "../../../components/component-error-list";
import RequiredAttribute from "../../../exceptions/RequiredAttribute";
import Link from "../link";

/**
 *  @typedef DownloadLinkProps
 * 
 * @property {string} href 
 * @property {string} fileName
 * @property {string} extension
 * @property {string} size
 * @property {string} unit
 * @property {import("@stitches/react").CSS} css
 */


/**
 * Âncora para download de arquivos configurada com as diretrizes do eMAG
 * 
 * Diretrizes adotadas:
 * 
 * Atenção a diretriz
 *  
 * Recomendação 3.5 – Descrever links clara e sucintamente
 * - O componente utiliza como base a exigência: "Em links de arquivos para download, é necessário informar a extensão e o tamanho do arquivo no próprio texto do link" 
 * 
 * Recomendação 4.4 – Possibilitar que o elemento com foco seja visualmente evidente
 * - Ao receber foco é aplicado uma borda vermelha de 2px do tipo solid no campo de texto.
 * Além da borda, foi reforçado o destaque do componente através do atributo outline.
 * 
 * Propriedades
 * - href: link para download do arquivo
 * - fileName: Nome do arquivo
 * - extension: Extensão do arquivo
 * - size: tamanho do arquivo em bytes, kb, mb, etc...
 * - unit: unidade do tamanho do arquivo bytes, kb, mb, etc...
 * @param {DownloadLinkProps} props 
 * @returns {React.JSX.Element}
 */
const DownloadLink = forwardRef(({
    href,
    fileName,
    extension,
    size,
    unit,
    css
}, ref) => {
    const [violations, setViolations] = useState([]);

    useEffect(() => {
        //Verifica se as propriedades informadas infligem alguma diretriz do eMAG.
        const violationsAux = [];

        if (!extension) {
            violationsAux.push(new GuidelineViolation(DESCRIBE_LINKS_CLEARLY_AND_SUCCINCTLY, `Em links de arquivos para download, é necessário informar a extensão do arquivo.`))
        }

        if (!size) {
            violationsAux.push(new GuidelineViolation(DESCRIBE_LINKS_CLEARLY_AND_SUCCINCTLY, `Em links de arquivos para download, é necessário informar o tamanho do arquivo.`))
        }

        if (!unit) {
            violationsAux.push(new RequiredAttribute("É necessário informar a unidade do tamanho do arquivo (Kb, Mb, Gb, etc)."))
        }

        setViolations([...violationsAux]);
    }, []);

    return (
        <>
            {
                violations.length === 0 &&
                <Link
                    css={css}
                    ref={ref}
                    href={href}
                    download={true} >
                    {fileName} ({extension}, {size}{unit})
                </Link>
            }
            {violations.length > 0 && <ComponentErrorList errors={violations} />}
        </>
    )
});

DownloadLink.propTypes = {
    href: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    extension: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired
}

export default DownloadLink;