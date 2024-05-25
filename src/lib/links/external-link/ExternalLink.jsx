import { lightTheme } from "../../../stitches.config";
import { fieldHightlight } from "../../fields/shared-styles/Field.style";

/**
 * @typedef ExternalLinkProps
 * @property {string} href
 * @property {string} text
 */

/**
 * Link para acesso de sites externos configurados com as diretrizes do eMAG.
 * 
 * Diretrizes adotadas:
 * 
 * 1.9 – Não abrir novas instâncias sem a solicitação do usuário:
 * É muito importante que os links abram na guia ou janela atual de navegação, 
 * pois os usuários com deficiência visual podem ter dificuldade em identificar que uma nova 
 * janela foi aberta. Além disso, estando em uma nova janela, não conseguirão retornar à página 
 * anterior utilizando a opção voltar do navegador. Quando for realmente necessária a abertura de 
 * um link em nova janela, é recomendado que tal ação seja informada ao usuário no próprio texto
 * do link. Isso permite ao usuário decidir se quer ou não sair da janela ou aba em que se 
 * encontra e, caso decida acessar o link, ele saberá que se trata de uma nova aba ou janela. 
 * 
 * 4.4 – Possibilitar que o elemento com foco seja visualmente evidente:
 * Ao focar no link, é aplicado uma borda.
 * @returns 
 */
const ExternalLink = ({ href, children }) => {
    return (
        <a
            target="_blank"
            rel="noopener noreferrer"
            className={`${lightTheme} ${fieldHightlight}`}
            href={href}>
            {children} (abre em nova janela) 
        </a>
    )
}

export default ExternalLink;