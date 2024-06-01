import { render, screen, waitFor } from "@testing-library/react";
import { FallbackMonth } from "./Month";

describe("[FallbackMonth] - Violando diretriz 6.2 do eMAG", () => {
    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo label para o campo mês", () => {
        render(
            <FallbackMonth
                id="txtMes"
                name="mes"
                required
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "Violação da diretriz 6.2 - Associar etiquetas aos seus campos";

        waitFor(() => {
            const alert = screen.queryByRole("alert");
            expect(alert).toBeInTheDocument();

            expect(alert).toHaveTextContent(title);
            expect(alert).toHaveTextContent(message);
        });
    });

    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo label", () => {
        render(
            <FallbackMonth
                label="Em qual mês você deseja nos visitar?"
                name="mes"
                required
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "Violação da diretriz 6.2 - Associar etiquetas aos seus campos";

        waitFor(() => {
            const alert = screen.queryByRole("alert");
            expect(alert).toBeInTheDocument();

            expect(alert).toHaveTextContent(title);
            expect(alert).toHaveTextContent(message);
        });
    });

});

describe("[FallbackMonth] - Conformidade com as diretrizes do eMAG", () => {
    it("Deve aparecer a indicação (campo obrigatório) quando isRequired for igual a true", () => {
        render(
            <FallbackMonth
                id="txtMes"
                label="Em qual mês você deseja nos visitar?"
                name="mes"
                required
            />
        )

        const monthField = screen.getByLabelText("Mês (campo obrigatório)");
        waitFor(() => expect(monthField.parentElement).toHaveTextContent("(campo obrigatório)"));

        const yearField = screen.getByLabelText("Ano (campo obrigatório)");
        waitFor(() => expect(yearField.parentElement).toHaveTextContent("(campo obrigatório)"));

    });

    it("Deve adicionar uma borda e outline na cor vermelho ao focar no campo mês", () => {
        render(
            <FallbackMonth
                id="txtMes"
                label="Em qual mês você deseja nos visitar?"
                name="mes"
                required
            />
        );

        const field = screen.getByLabelText("Mês (campo obrigatório)");
        field.focus();
        expect(field).toHaveFocus();

        waitFor(() => {
            expect(field).toHaveStyle("border: 1px solid #F00;");
            expect(field).toHaveStyle("outline:  2px solid #F00;")
        });
    })

    it("Deve adicionar uma borda e outline na cor vermelho ao focar no campo ano", () => {
        render(
            <FallbackMonth
                id="txtMes"
                label="Em qual mês você deseja nos visitar?"
                name="mes"
                required
            />
        );

        const field = screen.getByLabelText("Ano (campo obrigatório)");
        field.focus();
        expect(field).toHaveFocus();

        waitFor(() => {
            expect(field).toHaveStyle("border: 1px solid #F00;");
            expect(field).toHaveStyle("outline:  2px solid #F00;")
        });
    })

    it("Deve ser possível customizar o select do mês via props", () => {
        render(
            <FallbackMonth
                id="txtMes"
                label="Em qual mês você deseja nos visitar?"
                name="mes"
                fallbackMonthCss={{
                    backgroundColor: 'red',
                    margin: 10,
                    padding: 10
                }}
                required
            />
        );

        const field = screen.getByLabelText("Mês (campo obrigatório)");

        waitFor(() => {
            expect(field).toHaveStyle({
                'background-color': 'red',
                margin: 10,
                padding: 10
            })
        });
    })

    it("Deve ser possível customizar o select do ano via props", () => {
        render(
            <FallbackMonth
                id="txtMes"
                label="Em qual mês você deseja nos visitar?"
                name="mes"
                fallbackYearCss={{
                    backgroundColor: 'red',
                    margin: 10,
                    padding: 10
                }}
                required
            />
        );

        const field = screen.getByLabelText("Ano (campo obrigatório)");

        waitFor(() => {
            expect(field).toHaveStyle({
                'background-color': 'red',
                margin: 10,
                padding: 10
            })
        });
    })
});