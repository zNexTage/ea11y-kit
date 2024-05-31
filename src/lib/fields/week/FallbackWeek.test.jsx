import { render, screen, waitFor } from "@testing-library/react";
import { FallbackWeek } from "./Week";

describe("[FallbackWeek] - Violando diretriz 6.2 do eMAG", () => {
    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo label", () => {
        render(
            <FallbackWeek
                id="week"
                name="fallback_week"
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


    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo id", () => {
        render(
            <FallbackWeek
                label="Em qual semana do ano o curso vai começar?"
                name="fallback_week"
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "Violação da diretriz 6.2 - Associar etiquetas aos seus campos";

        waitFor(() => {
            const alert = screen.queryByRole("alert");
            expect(alert).toBeInTheDocument();

            expect(alert).toHaveTextContent(title);
            expect(alert).toHaveTextContent(message);
        })
    });
});

describe("[FallbackWeek] - Omitindo outros atributos", () => {
    it("Deverá ser renderizado um alerta ao omitir o atributo name", () => {
        render(
            <FallbackWeek
                id="week"
                label="teste"
                required
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "É necessário especificar o nome (name) do campo. O atributo name é usado como referência quando os dados são enviados (https://www.w3schools.com/tags/att_name.asp).";

        waitFor(() => {
            const alert = screen.queryByRole("alert");
            expect(alert).toBeInTheDocument();

            expect(alert).toHaveTextContent(title);
            expect(alert).toHaveTextContent(message);
        });
    })
})

describe("[FallbackWeek] - Conformidade com as diretrizes do eMAG", () => {
    it("Deve aparecer a indicação (campo obrigatório) quando required do campo semana for igual a true", () => {
        render(
            <FallbackWeek
                id="txtWeek"
                required
                label="Em qual semana do ano o curso vai começar?"
                name="fallback_week"
            />
        );


        const field = screen.getByLabelText("Semana (campo obrigatório)");

        waitFor(() => expect(field.parentElement).toHaveTextContent("(campo obrigatório)"));

    });

    it("Deve aparecer a indicação (campo obrigatório) quando required do campo semana (yeekField) for igual a true", () => {
        render(
            <FallbackWeek
                id="txtWeek"
                required
                label="Em qual semana do ano o curso vai começar?"
                name="fallback_week"
            />
        )

        const field = screen.getByLabelText("Ano (campo obrigatório)");

        waitFor(() => expect(field.parentElement).toHaveTextContent("(campo obrigatório)"));
    })

    it("Deve ser possível customizar o select de semana via propriedade fallbackWeekCss", () => {
        render(
            <FallbackWeek
                id="txtWeek"
                required
                label="Em qual semana do ano o curso vai começar?"
                name="fallback_week"
                fallbackWeekCss={{
                    backgroundColor: "red",
                    margin: 10,
                    padding: 10
                }}
            />
        )

        const field = screen.getByLabelText("Semana (campo obrigatório)");

        waitFor(() => expect(field).toHaveStyle({
            "background-color": "red",
            margin: 10,
            padding: 10
        }));
    })

    it("Deve ser possível customizar o select de ano via propriedade fallbackYearCss", () => {
        render(
            <FallbackWeek
                id="txtWeek"
                required
                label="Em qual semana do ano o curso vai começar?"
                name="fallback_week"
                fallbackWeekYearCss={{
                    backgroundColor: "red",
                    margin: 10,
                    padding: 10
                }}
            />
        )

        const field = screen.getByLabelText("Ano (campo obrigatório)");

        waitFor(() => {
            expect(field).toHaveStyle({
                "background-color": "red",
                margin: 10,
                padding: 10
            })
        })
    })
});