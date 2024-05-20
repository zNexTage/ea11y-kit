import { render, screen, waitFor } from "@testing-library/react";
import Phone from "./Phone";

describe("[Phone] - Violando diretriz 6.2 do eMAG", () => {
    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo label", () => {
        render(
            <Phone
                id="ID"
                whichFormat="both"
                isRequired
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
    });

    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo id", () => {
        render(
            <Phone
                label="Teste"
                whichFormat="both"
                isRequired
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
    });
});

describe("[Phone] - Omitindo outros atributos", () => {
    it("Deverá ser renderizado um alerta ao omitir o atributo name", () => {
        render(
            <Phone
                label="Teste"
                whichFormat="both"
                isRequired
                placeholder="Teste"
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "É necessário especificar o nome (name) do campo. O atributo name é usado como referência quando os dados são enviados (https://www.w3schools.com/tags/att_name.asp).";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
    });
});

describe("[Phone] - Conformidade com as diretrizes do eMAG", () => {
    it("Deve aparecer a indicação (campo obrigatório) quando isRequired for igual a true", () => {
        render(
            <Phone
                id="phone"
                label="Telefone"
                whichFormat="both"
                isRequired
                placeholder="Informe seu telefone..."
                name="phone"
            />
        )

        const field = screen.getByLabelText("Telefone (campo obrigatório) (00) 90000-0000 / (00) 0000-0000");

        waitFor(() => expect(field.parentElement).toHaveTextContent("(campo obrigatório)"));

    });

    it("Deve aparecer a indicação o formato de telefone quando whichFormat for igual a phone", () => {
        render(
            <Phone
                id="phone"
                label="Telefone"
                whichFormat="phone"
                isRequired
                placeholder="Informe seu telefone..."
                name="phone"
            />
        )

        const field = screen.getByLabelText("Telefone (campo obrigatório) (00) 0000-0000");

        waitFor(() => expect(field.parentElement).toHaveTextContent("(00) 0000-0000"));
    });

    it("Deve aparecer a indicação o formato de telefone quando whichFormat for igual a both", () => {
        render(
            <Phone
                id="phone"
                label="Telefone"
                whichFormat="both"
                isRequired
                placeholder="Informe seu telefone e celular..."
                name="phone"
            />
        )

        const field = screen.getByLabelText("Telefone (campo obrigatório) (00) 90000-0000 / (00) 0000-0000");

        waitFor(() => expect(field.parentElement).toHaveTextContent("(00) 90000-0000 / (00) 0000-0000"));
    });

    it("Deve aparecer a indicação o formato de telefone quando whichFormat for igual a cellphone", () => {
        render(
            <Phone
                id="cellphone"
                label="Telefone"
                whichFormat="cellphone"
                isRequired
                placeholder="Informe seu celular..."
                name="cellphone"
            />
        )

        const field = screen.getByLabelText("Telefone (campo obrigatório) (00) 90000-0000");

        waitFor(() => expect(field.parentElement).toHaveTextContent("(00) 90000-0000"));
    });

    it("Deve adicionar uma borda e outline na cor vermelho ao focar no campo de texto", () => {
        render(
            <Phone
                id="cellphone"
                label="Telefone"
                whichFormat="cellphone"
                isRequired
                placeholder="Informe seu celular..."
                name="cellphone"
            />
        );

        const field = screen.getByLabelText("Telefone (campo obrigatório) (00) 90000-0000");
        field.focus();
        expect(field).toHaveFocus();

        waitFor(() => {
            expect(field).toHaveStyle("border: 1px solid #F00;");
            expect(field).toHaveStyle("outline:  2px solid #F00;")
        });
    })
});