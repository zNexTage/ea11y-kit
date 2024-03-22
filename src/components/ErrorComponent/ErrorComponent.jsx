const ErrorComponent = ({ error, resetErrorBoundary }) => {
    return (
        <div role="alert">
            <h1>
                Violação das diretrizes do <abbr title="Modelo de Acessibilidade em Governo Eletrônico">eMAG</abbr>
            </h1>
            <p style={{ color: "red" }}>{error.message}</p>
        </div>
    )
}

export default ErrorComponent;