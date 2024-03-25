import BaseError from "../../exceptions/BaseError";

/**
 * Lista os erros que ocorreram em um determinado componente para indicar o desenvolvedor o que ele
 * precisa corrigir.
 * @param {{errors: Array<BaseError>}} props 
 */
const ComponentErrorList = ({ errors }) => {
    
    return (
        <div role="alert">
            <h1>
                Violação das diretrizes do <abbr title="Modelo de Acessibilidade em Governo Eletrônico">eMAG</abbr>
            </h1>
            <ul>
                {errors.map((err, index) => (
                    <li key={`error_${index}`}>
                        {err.message}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ComponentErrorList;