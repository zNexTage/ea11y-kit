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

describe("[Week] - Conformidade com as diretrizes do eMAG", () => {
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
});