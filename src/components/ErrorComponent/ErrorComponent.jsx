const ErrorComponent = ({ error, resetErrorBoundary }) => {
    return (
        <div role="alert">
            <h1>
                Violação das diretrizes do <abbr title="Modelo de Acessibilidade em Governo Eletrônico">eMAG</abbr>
            </h1>

            <ul>
                {error.getErrorMessages().map(message => (
                    <li style={{ color: "red" }}>
                        {message}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ErrorComponent;