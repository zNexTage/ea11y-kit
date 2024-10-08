import { render, screen, waitFor } from "@testing-library/react"
import Color from "./Color"

describe("[Color] - Violando diretriz 6.2 do eMAG", () => {
    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo label", () => {
        render(
            <Color
                id="color"
                name="color"
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

    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo id", () => {
        render(
            <Color
                label="color"
                name="color"
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

describe("[Color] - Omitindo outros atributos", () => {
    it("Deverá ser renderizado um alerta ao omitir o atributo name", () => {
        render(
            <Color
                label="color"
                id="color"
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "É necessário especificar o nome (name) do campo. O atributo name é usado como referência quando os dados são enviados (https://www.w3schools.com/tags/att_name.asp).";

        waitFor(() => {
            const alert = screen.queryByRole("alert");
            expect(alert).toBeInTheDocument();

            expect(alert).toHaveTextContent(title);
            expect(alert).toHaveTextContent(message);
        })
    });
});

describe("[Color] - Conformidade com as diretrizes do eMAG", () => {
    it("Deve aparecer a indicação (campo obrigatório) quando isRequired for igual a true", () => {
        render(
            <Color
                name="color"
                label="color"
                id="color"
                required
            />
        )

        const field = screen.getByLabelText("color (campo obrigatório)");

        waitFor(() => expect(field.parentElement).toHaveTextContent("(campo obrigatório)"));

    });

    it("Deve adicionar uma borda e outline na cor vermelho ao focar no campo de texto", () => {
        render(
            <Color
                name="color"
                label="color"
                id="color"
                required
            />
        );

        const field = screen.getByLabelText("color (campo obrigatório)");
        field.focus();
        expect(field).toHaveFocus();

        waitFor(() => {
            expect(field).toHaveStyle("border: 1px solid #F00;");
            expect(field).toHaveStyle("outline:  2px solid #F00;")
        });
    });

    it("Deve ser possível customizar o componente via propriedade css", () => {
        render(
            <Color
                css={{
                    backgroundColor: "red",
                    padding: 10,
                    margin: 20
                }}
                name="color"
                label="color"
                id="color"
                required
            />
        );

        const field = screen.getByLabelText("color (campo obrigatório)");
        
        waitFor(() => {
            expect(field).toHaveStyle("background-color: red");
            expect(field).toHaveStyle("padding: 10");
            expect(field).toHaveStyle("margin: 20");
        });
    })
});