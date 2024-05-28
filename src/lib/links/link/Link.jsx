import { lightTheme } from "../../../stitches.config";
import { fieldHightlight } from "../../fields/shared-styles/Field.style";

const TARGET_BLANK = "_blank";
const TARGET_SELF = "_self";

/**
 * @typedef LinkProps
 * @property {string} href
 * @property {React.ReactNode} children
 * @property {"_blank"|"_self"|"_parent"|"_top"|"framename"} target
 */

/**
 * Link pré-configurado com as diretrizes do eMAG. A descrição do link deve ser clara e deve expressar
 * o destino do link.
 * 
 * Diretriz adotadas:
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
 * 
 * @param {LinkProps} props 
 * @returns 
 */
const Link = ({ children, href, target = TARGET_SELF }) => {

    const extraProps = {};

    const isTargetBlank = target === TARGET_BLANK;

    /*
    adiciona a configuração com noopener e noreferrer.
    noopener:  
      - Previne que a nova página (a que foi aberta com target="_blank") tenha acesso ao objeto window.opener.
      - Sem essa precaução, a nova página poderia executar scripts que manipulassem a página original, o que pode ser um risco de segurança.
    noreferrer:
      - Impede que a página de destino receba informações sobre a origem (referer) do link.
      - Isso significa que a nova página não saberá de qual página você veio, preservando a privacidade do usuário e evitando que a nova página saiba de onde o tráfego está vindo.
    */
    if (isTargetBlank) {
        extraProps["rel"] = "noopener noreferrer"
    }

    return (
        <a href={href} className={`${lightTheme} ${fieldHightlight}`} {...extraProps}>
            {children} {isTargetBlank && <span>(abre em nova janela)</span>}
        </a>
    )
}

export default Link;