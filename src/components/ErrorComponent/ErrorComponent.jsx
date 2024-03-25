const ErrorComponent = ({ error, resetErrorBoundary }) => {
    return (
        <div role="alert">
            <h1>
                Violação das diretrizes do <abbr title="Modelo de Acessibilidade em Governo Eletrônico">eMAG</abbr>
            </h1>

            <ul>
                {error.getViolations().map(violation => (
                    <li style={{ color: "red" }}>
                        {violation}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ErrorComponent;