import { render, screen, waitFor } from "@testing-library/react";
import Week from "./Week";

describe("[Week] - Violando diretriz 6.2 do eMAG", () => {
    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo label", async () => {
        render(
            <Week
                id="txtWeek"
                name="week"
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "Violação da diretriz 6.2 - Associar etiquetas aos seus campos";

        await waitFor(() => {
            const alert = screen.queryByRole("alert");
            expect(alert).toBeInTheDocument();

            expect(alert).toHaveTextContent(title);
            expect(alert).toHaveTextContent(message);
            expect(alert).toHaveTextContent("Componente: Week");
        });
    });

    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo id", async () => {
        render(
            <Week
                label="label"
                name="semana"
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "Violação da diretriz 6.2 - Associar etiquetas aos seus campos";

        await waitFor(() => {
            const alert = screen.queryByRole("alert");
            expect(alert).toBeInTheDocument();

            expect(alert).toHaveTextContent(title);
            expect(alert).toHaveTextContent(message);
            expect(alert).toHaveTextContent("Componente: Week");
        })
    });
});

describe("[Week] - Omitindo outros atributos", () => {
    it("Deverá ser renderizado um alerta ao omitir o atributo name", async () => {
        render(
            <Week
                id="semana"
                label="semana"
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "É necessário especificar o nome (name) do campo. O atributo name é usado como referência quando os dados são enviados (https://www.w3schools.com/tags/att_name.asp).";

        await waitFor(() => {
            const alert = screen.queryByRole("alert");
            expect(alert).toBeInTheDocument();

            expect(alert).toHaveTextContent(title);
            expect(alert).toHaveTextContent(message);
            expect(alert).toHaveTextContent("Componente: Week");
        });
    });
});

describe("[Week] - Conformidade com as diretrizes do eMAG", () => {
    it("Deve aparecer a indicação (campo obrigatório) quando required for igual a true", () => {
        render(
            <Week
                id="teste"
                required={true}
                name="semana"
                label="teste"
            />
        )

        const field = screen.getByLabelText("teste (campo obrigatório)");

        waitFor(() => expect(field.parentElement).toHaveTextContent("(campo obrigatório)"));

    });

    it("Deve adicionar uma borda e outline na cor vermelho ao focar no campo de texto", () => {
        render(
            <Week
                id="teste"
                required={true}
                name="semana"
                label="teste"
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

    it("Deve ser possível customizar o componente via propriedade css", () => {
        render(
            <Week
                id="teste"
                required={true}
                name="semana"
                label="teste"
                css={{
                    backgroundColor: "red",
                    margin: 10,
                    padding: 10
                }}
            />
        );

        const field = screen.getByLabelText("teste (campo obrigatório)");

        waitFor(() => {
            expect(field).toHaveStyle({
                "background-color": "red",
                margin: 10,
                padding: 10
            })
        });
    })
});