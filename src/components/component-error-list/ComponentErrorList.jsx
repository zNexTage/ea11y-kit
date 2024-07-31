import BaseError from "../../exceptions/BaseError";
import Link from "../../lib/links/link";

/**
 * Lista os erros que ocorreram em um determinado componente para indicar o desenvolvedor o que ele
 * precisa corrigir.
 * @param {{errors: Array<BaseError>, whichComponent: string}} props 
 */
const ComponentErrorList = ({ errors, whichComponent }) => {

    return (
        <div role="alert">
            <h1>
                Violação das diretrizes do <abbr title="Modelo de Acessibilidade em Governo Eletrônico">eMAG</abbr>
            </h1>

            <p>
                Componente: <b>{whichComponent}</b>
            </p>

            <ul>
                {errors.map((err, index) => {
                    return (
                        <li key={`error_${index}`}>
                            {err.message}&nbsp;
                            {err.guidelineUrl &&
                                <>
                                    <br />
                                    <Link href={err.guidelineUrl} target="_blank">
                                        Veja mais sobre as diretrizes do eMAG clicando aqui.
                                    </Link>
                                </>
                            }
                        </li>
                    )
                }
                )}
            </ul>
        </div>
    )
}

export default ComponentErrorList;