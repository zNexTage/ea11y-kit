import { render, screen, waitFor } from "@testing-library/react";
import { FallbackWeek } from "./Week";

describe("[FallbackWeek] - Violando diretriz 6.2 do eMAG", () => {
    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo label para o campo semana (weekField)", () => {
        render(
            <FallbackWeek
                weekField={{
                    id: "txtWeek",
                }}
                yearField={{
                    id: "txtAno",
                    label: "selecione o ano"
                }}
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

    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo label para o campo ano (yearField)", () => {
        render(
            <FallbackWeek
                weekField={{
                    id: "txtWeek",
                    label: "semana"
                }}
                yearField={{
                    id: "txtAno",
                }}
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

    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo id para o campo semana (weekField)", () => {
        render(
            <FallbackWeek
                weekField={{
                    label: "semana"
                }}
                yearField={{
                    id: "txtAno",
                    label: "ano"
                }}
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

    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo id para o campo ano (yearField)", () => {
        render(
            <FallbackWeek
                weekField={{
                    label: "semana",
                    id: "semana"
                }}
                yearField={{
                    label: "ano"
                }}
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
    it("Deve aparecer a indicação (campo obrigatório) quando required do campo semana (weekField) for igual a true", () => {
        render(
            <FallbackWeek
                weekField={{
                    label: "semana",
                    id: "semana"
                }}
                yearField={{
                    label: "ano",
                    id: "ano"
                }}
                name="fallback_week"
                required
            />
        )

        const field = screen.getByLabelText("semana (campo obrigatório)");

        waitFor(() => expect(field.parentElement).toHaveTextContent("(campo obrigatório)"));

    });

    it("Deve aparecer a indicação (campo obrigatório) quando required do campo semana (yeekField) for igual a true", () => {
        render(
            <FallbackWeek
                weekField={{
                    label: "semana",
                    id: "ano"
                }}
                yearField={{
                    label: "ano",
                    id: "ano"
                }}
                name="fallback_week"
                required
            />
        )

        const field = screen.getByLabelText("ano (campo obrigatório)");

        waitFor(() => expect(field.parentElement).toHaveTextContent("(campo obrigatório)"));
    })
});