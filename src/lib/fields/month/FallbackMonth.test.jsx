import { render, screen, waitFor } from "@testing-library/react";
import { FallbackMonth } from "./Month";

describe("[FallbackMonth] - Violando diretriz 6.2 do eMAG", () => {
    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo label para o campo mês", () => {
        render(
            <FallbackMonth
                monthField={{
                    id: "txtmes",
                    name: "mes"
                }}
                yearField={{
                    id: "ano",
                    label: "ano",
                    name: "ano"
                }}
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

    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo label para o campo ano", () => {
        render(
            <FallbackMonth
                monthField={{
                    id: "txtmes",
                    name: "mes",
                    label: "mes"
                }}
                yearField={{
                    id: "ano",
                    name: "ano"
                }}
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
    })

    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo id para o campo mês", () => {
        render(
            <FallbackMonth
                monthField={{
                    name: "mes",
                    label: "mes"
                }}
                yearField={{
                    id: "ano",
                    label: "ano",
                    name: "ano"
                }}
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

    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo id para o campo ano", () => {
        render(
            <FallbackMonth
                monthField={{
                    id: "txtmes",
                    name: "mes",
                    label: "mes"
                }}
                yearField={{
                    name: "ano",
                    label: "ano"
                }}
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
    })
});

describe("[Month] - Conformidade com as diretrizes do eMAG", () => {
    it("Deve aparecer a indicação (campo obrigatório) quando isRequired for igual a true", () => {
        render(
            <FallbackMonth
                required
                monthField={{
                    id: "txtmes",
                    name: "mes",
                    label: "mes"
                }}
                yearField={{
                    name: "ano",
                    label: "ano",
                    id: "ano"
                }}
                
            />
        )

        const monthField = screen.getByLabelText("mes (campo obrigatório)");
        waitFor(() => expect(monthField.parentElement).toHaveTextContent("(campo obrigatório)"));

        const yearField = screen.getByLabelText("ano (campo obrigatório)");
        waitFor(() => expect(yearField.parentElement).toHaveTextContent("(campo obrigatório)"));        

    });

    it("Deve adicionar uma borda e outline na cor vermelho ao focar no campo mês", () => {
        render(
            <FallbackMonth
                required
                monthField={{
                    id: "txtmes",
                    name: "mes",
                    label: "mes"
                }}
                yearField={{
                    name: "ano",
                    label: "ano",
                    id: "ano"
                }}
                
            />
        );

        const field = screen.getByLabelText("mes (campo obrigatório)");
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
                required
                monthField={{
                    id: "txtmes",
                    name: "mes",
                    label: "mes"
                }}
                yearField={{
                    name: "ano",
                    label: "ano",
                    id: "ano"
                }}
                
            />
        );

        const field = screen.getByLabelText("ano (campo obrigatório)");
        field.focus();
        expect(field).toHaveFocus();

        waitFor(() => {
            expect(field).toHaveStyle("border: 1px solid #F00;");
            expect(field).toHaveStyle("outline:  2px solid #F00;")
        });
    })
});