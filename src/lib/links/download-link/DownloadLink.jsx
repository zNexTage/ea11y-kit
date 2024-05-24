import { useEffect, useRef, useState } from "react";
import GuidelineViolation from "../../../exceptions/GuidelineViolation/GuidelineViolation";
import { DESCRIBE_LINKS_CLEARLY_AND_SUCCINCTLY } from "../../../utils/eMagGuidelineCode";
import ComponentErrorList from "../../../components/component-error-list";
import RequiredAttribute from "../../../exceptions/RequiredAttribute";
import * as KeyboardKeys from "../../../utils/KeyboardCodes";
import { lightTheme } from "../../../stitches.config";
import { fieldHightlight } from "../../fields/shared-styles/Field.style";

/**
 *  @typedef DownloadLinkProps
 * 
 * @property {string} href 
 * @property {string} fileName
 * @property {string} extension
 * @property {string} size
 * @property {string} unit
 */

/**
 * Âncora para download de arquivos configurada com as diretrizes do eMAG
 * 
 * Diretrizes adotadas:
 * 
 * Atenção a diretriz
 * Recomendação 1.9 – Não abrir novas instâncias sem a solicitação do usuário
 * o eMAG não recomenda "O uso do atributo target=“_blank”;", pois "os usuários com deficiência visual podem 
 * ter dificuldade em identificar que uma nova janela foi aberta. Além disso, estando em uma nova janela, 
 * não conseguirão retornar à página anterior utilizando a opção voltar do navegador.". Entretanto, como o componente
 * permitira visualizar o arquivo anexado, será utilizado o target _blank para que o arquivo seja aberto em uma nova guia.
 * Entretanto, o eMAG descreve o seguinte para situações onde é necessário o uso do target _blank:
 * "Quando for realmente necessária a abertura de um link em nova janela, é recomendado que tal ação seja 
 * informada ao usuário no próprio texto do link. Isso permite ao usuário decidir se quer ou não sair da 
 * janela ou aba em que se encontra e, caso decida acessar o link, ele saberá que se trata de uma nova aba 
 * ou janela." Logo a frente do nome do arquivo e da extensão será acrescentado o texto (abre em nova janela).
 * 
 * Recomendação 2.1 - Disponibilizar todas as funções da página via teclado
 * É possível interagir com o link utilizando o espaço do teclado.
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
const DownloadLink = ({
    href,
    fileName,
    extension,
    size,
    unit
}) => {
    const [violations, setViolations] = useState([]);

    const downloadLinkRef = useRef();

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

    /**
     * Captura interação pelo teclado e permite interagir com o link usando a tecla espaço.
     * @param {KeyboardEvent} event 
     */
    const onKeyDown = event => {
        //TODO: Criar constantes para as teclas.
        if (event.code == KeyboardKeys.SPACE) {
            downloadLinkRef.current.click();
        }
    }

    return (
        <>
            {
                violations.length === 0 &&
                <a
                    ref={downloadLinkRef}
                    onKeyDown={onKeyDown}
                    className={`${lightTheme} ${fieldHightlight}`}
                    download={true}
                    href={href}>
                    {fileName} ({extension} {size}{unit})
                </a>
            }
            {violations.length > 0 && <ComponentErrorList errors={violations} />}
        </>
    )
}

export default DownloadLink;