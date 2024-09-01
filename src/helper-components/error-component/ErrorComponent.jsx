import { styled } from "@stitches/react";

const ErrorItem = styled("li", {
    color: "red"
});

const ErrorComponent = ({ error, resetErrorBoundary }) => {
    return (
        <div role="alert">
            <h1>
                Violação das diretrizes do <abbr title="Modelo de Acessibilidade em Governo Eletrônico">eMAG</abbr>
            </h1>

            <ul>
                {error.getErrorMessages().map(message => (
                    <ErrorItem>
                        {message}
                    </ErrorItem>
                ))}
            </ul>
        </div>
    )
}

export default ErrorComponent;