import { lightTheme, } from "../../stitches.config";
import { fieldHightlight } from "../fields/shared-styles/Field.style";
import DownloadLink from "../links/download-link/DownloadLink";

/**
 * @typedef Source
 * @property {string} src
 * @property {string} type
 */

/**
 * @typedef AudioProps
 * @property {Array<Source>} sources
 * @property {import("../links/download-link/DownloadLink").DownloadLinkProps} caption
 * 
 */


/**
 * Componente de áudio pré-configurado com as diretrizes do eMAG
 * 
 * Diretrizes adotadas:
 * 
 * 5.2 – Fornecer alternativa para áudio - é obrigatório fornecer uma alternativa textual com o conteúdo do áudio. Pode-se informar
 * via parâmetro uma legenda. O componente se encarrega de renderizar os trechos da legenda para o usuário.
 * 5.4 – Fornecer controle de áudio para som - o componente fornece elementos para pausar, play, volume e ativar legendas;
 * 4.4 – Possibilitar que o elemento com foco seja visualmente evidente - ao focar no elemento e nos itens interativos,
 * é demonstrado uma borda;
 * @param {AudioProps} props
 * @returns 
 */
const Audio = ({ sources, caption }) => {

    return (
        <div>
            <audio className={`${lightTheme} ${fieldHightlight}`} controls>
                {
                    sources.map((source, index) => (
                        <source
                            key={`audio_source_${index}`}
                            src={source.src}
                            type={source.type}>
                        </source>
                    ))
                }
            </audio>
            <br />
            <DownloadLink
                {...caption}
            />
        </div>
    )
}

export default Audio;