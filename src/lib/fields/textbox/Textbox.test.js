import { render, screen, waitFor, } from "@testing-library/react"
import Textbox from "./Textbox"

describe("[Textbox] - Violando diretriz 6.2 do eMAG", () => {
    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo label", () => {
        render(
            <Textbox
                id="ID"
                placeholder="Teste"
                type="text"
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "Violação da diretriz 6.2 - Associar etiquetas aos seus campos";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
        expect(alert).toHaveTextContent("Componente: Textbox");
    });

    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo id", () => {
        render(
            <Textbox
                label="label"
                placeholder="Teste"
                type="text"
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "Violação da diretriz 6.2 - Associar etiquetas aos seus campos";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
        expect(alert).toHaveTextContent("Componente: Textbox");
    });
});

describe("[Textbox] - Violando diretriz 6.5 do eMAG", () => {
    it("Deverá ser renderizado um alerta de violação da diretriz 6.5 ao omitir o atributo placeholder", () => {
        render(
            <Textbox
                id="d"
                label="label"
                type="text"
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "Violação da diretriz 6.5 - Fornecer instruções para entrada de dados";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
        expect(alert).toHaveTextContent("Componente: Textbox");
    })
});

describe("[Textbox] - Omitindo outros atributos", () => {
    it("Deverá ser renderizado um alerta ao omitir o atributo type", () => {
        render(
            <Textbox
                id="d"
                placeholder="Digite aqui..."
                label="label"
                name="teste"
                type=""
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "É necessário especificar o tipo do campo de texto (atributo 'type')";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
        expect(alert).toHaveTextContent("Componente: Textbox");
    });
});

describe("[Textbox] - Conformidade com as diretrizes do eMAG", () => {
    it("Deve aparecer a indicação (campo obrigatório) quando required for igual a true", () => {
        render(
            <Textbox
                id="teste"
                required={true}
                label="teste"
                name="teste"
                type="text"
                placeholder="Digite aqui..."
            />
        )

        const field = screen.getByLabelText("teste (campo obrigatório)");

        waitFor(() => expect(field.parentElement).toHaveTextContent("(campo obrigatório)"));

    });

    it("Deve adicionar uma borda e outline na cor vermelho ao focar no campo de texto", () => {
        render(
            <Textbox
                id="teste"
                required={true}
                label="teste"
                name="teste"
                type="text"
                placeholder="Digite aqui..."
            />
        );

        const field = screen.getByLabelText("teste (campo obrigatório)");
        field.focus();
        expect(field).toHaveFocus();

        waitFor(() => {
            expect(field).toHaveStyle("border: 1px solid #F00;");
            expect(field).toHaveStyle("outline:  2px solid #F00;")
        });
    });

    it("Deve ser possível customizar o componente via propriedade css", () => {
        render(
            <Textbox
                css={{
                    backgroundColor: "red",
                    padding: 10,
                    margin: 20
                }}
                id="teste"
                required={true}
                label="teste"
                name="teste"
                type="text"
                placeholder="Digite aqui..."
            />
        );

        const field = screen.getByLabelText("teste (campo obrigatório)");

        waitFor(() => {
            expect(field).toHaveStyle("background-color: red");
            expect(field).toHaveStyle("padding: 10");
            expect(field).toHaveStyle("margin: 20");
        });
    })
});