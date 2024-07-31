import { render, screen, waitFor, } from "@testing-library/react"
import Textarea from "./Textarea";


describe("[Textarea] - Violando diretriz 6.2 do eMAG", () => {
    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo label", () => {
        render(
            <Textarea
                id="ID"
                placeholder="Teste"
                name="teste"
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "Violação da diretriz 6.2 - Associar etiquetas aos seus campos";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
        expect(alert).toHaveTextContent("Componente: Textarea");
    });

    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo id", () => {
        render(
            <Textarea
                label="teste"
                placeholder="Teste"
                name="teste"
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "Violação da diretriz 6.2 - Associar etiquetas aos seus campos";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
        expect(alert).toHaveTextContent("Componente: Textarea");
    });
});

describe("[Textarea] - Violando diretriz 6.5 do eMAG", () => {
    it("Deverá ser renderizado um alerta de violação da diretriz 6.5 ao omitir o atributo placeholder", () => {
        render(
            <Textarea
                id="d"
                label="label"
                name="teste"
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "Violação da diretriz 6.5 - Fornecer instruções para entrada de dados";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
        expect(alert).toHaveTextContent("Componente: Textarea");
    })
});

describe("[Textarea] - Omitindo outros atributos", () => {
    it("Deverá ser renderizado um alerta ao omitir o atributo name", () => {
        render(
            <Textarea
                id="d"
                label="label"
                placeholder="label"
                required
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "É necessário especificar o nome (name) do campo. O atributo name é usado como referência quando os dados são enviados (https://www.w3schools.com/tags/att_name.asp).";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
        expect(alert).toHaveTextContent("Componente: Textarea");
    });
});

describe("[Textarea] - Conformidade com as diretrizes do eMAG", () => {
    it("Deve aparecer a indicação (campo obrigatório) quando isRequired for igual a true", () => {
        render(
            <Textarea
                id="txtDescricao"
                label="Descrição"
                placeholder="Digite aqui a descrição do produto"
                required
                name="descricao"
            />
        )

        const field = screen.getByLabelText("Descrição (campo obrigatório)");

        waitFor(() => expect(field.parentElement).toHaveTextContent("(campo obrigatório)"));

    });

    it("Deve adicionar uma borda e outline na cor vermelho ao focar no campo de texto", () => {
        render(
            <Textarea
                id="txtDescricao"
                label="Descrição"
                placeholder="Digite aqui a descrição do produto"
                required
                name="descricao"
            />
        );

        const field = screen.getByLabelText("Descrição (campo obrigatório)");
        field.focus();
        expect(field).toHaveFocus();

        waitFor(() => {
            expect(field).toHaveStyle("border: 1px solid #F00;");
            expect(field).toHaveStyle("outline:  2px solid #F00;")
        });
    })

    it("Deve ser possível customizar o css via props", () => {
        render(
            <Textarea
                id="txtDescricao"
                label="Descrição"
                placeholder="Digite aqui a descrição do produto"
                required
                name="descricao"
                css={{
                    backgroundColor: "red",
                    margin: 10,
                    padding: 10
                }}
            />
        );

        const field = screen.getByLabelText("Descrição (campo obrigatório)");

        waitFor(() => {
            expect(field).toHaveStyle({
                "background-color": "red",
                margin: 10,
                padding: 10
            })
        });
    })
});