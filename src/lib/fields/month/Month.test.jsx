import { render, screen, waitFor } from "@testing-library/react";
import Month from "./Month";

describe("[Month] - Violando diretriz 6.2 do eMAG", () => {
    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo label", () => {
        render(
            <Month
                id="mes"
                name="mes"
                fallbackMonthProps={{
                    monthField: {
                        id: "txtmes",
                        label: "mes",
                        name: "mes"
                    },
                    yearField: {
                        id: "ano",
                        label: "ano",
                        name: "ano"
                    }
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

    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo id", () => {
        render(
            <Month
                label="mes"
                name="mes"
                fallbackMonthProps={{
                    monthField: {
                        id: "txtmes",
                        label: "mes",
                        name: "mes"
                    },
                    yearField: {
                        id: "ano",
                        label: "ano",
                        name: "ano"
                    }
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
});

describe("[Month] - Conformidade com as diretrizes do eMAG", () => {
    it("Deve aparecer a indicação (campo obrigatório) quando isRequired for igual a true", () => {
        render(
            <Month
                id="teste"
                isRequired={true}
                label="teste"
                name="mes"
                fallbackMonthProps={{
                    monthField: {
                        id: "txtmes",
                        label: "mes",
                        name: "mes"
                    },
                    yearField: {
                        id: "ano",
                        label: "ano",
                        name: "ano"
                    }
                }}
            />
        )

        const field = screen.getByLabelText("teste (campo obrigatório)");

        waitFor(() => expect(field.parentElement).toHaveTextContent("(campo obrigatório)"));

    });

    it("Deve adicionar uma borda e outline na cor vermelho ao focar no campo de texto", () => {
        render(
            <Month
                id="teste"
                isRequired={true}
                label="teste"
                fallbackMonthProps={{
                    monthField: {
                        id: "txtmes",
                        label: "mes",
                        name: "mes"
                    },
                    yearField: {
                        id: "ano",
                        label: "ano",
                        name: "ano"
                    }
                }}
            />
        );

        const field = screen.getByLabelText("teste (campo obrigatório)");
        field.focus();
        expect(field).toHaveFocus();

        waitFor(() => {
            expect(field).toHaveStyle("border: 1px solid #F00;");
            expect(field).toHaveStyle("outline:  2px solid #F00;")
        });
    })
});