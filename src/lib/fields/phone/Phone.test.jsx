import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Phone from "./Phone";

describe("[Phone] - Violando diretriz 6.2 do eMAG", () => {
    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo label", () => {
        render(
            <Phone
                id="ID"
                whichFormat="both"
                required
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
                required
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

describe("[Phone] - Violando diretriz 6.5 do eMAG", () => {
    it("Deverá ser renderizado um alerta de violação da diretriz 6.5 ao omitir o atributo placeholder", () => {
        render(
            <Phone
                id="phone"
                label="Telefone"
                whichFormat="both"
                required
                name="phone"
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "Violação da diretriz 6.5 - Fornecer instruções para entrada de dados";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
    })
})

describe("[Phone] - Omitindo outros atributos", () => {
    it("Deverá ser renderizado um alerta ao omitir o atributo name", () => {
        render(
            <Phone
                label="Teste"
                whichFormat="both"
                required
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
    it("Deve aparecer a indicação (campo obrigatório) quando required for igual a true", () => {
        render(
            <Phone
                id="phone"
                label="Telefone"
                whichFormat="both"
                required
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
                required
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
                required
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
                required
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
                required
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

describe("[Phone] - Formatação", () => {
    it("Deve aplicar mascara para celulares", () => {
        render(
            <Phone
                id="phone"
                label="Celular"
                whichFormat="cellphone"
                required
                placeholder="Informe seu telefone fixo ou celular..."
                name="phone"
            />
        );

        const field = screen.getByLabelText("Celular (campo obrigatório) (00) 90000-0000");

        fireEvent.change(field, { target: { value: "11956824156" } });
        expect(field).toHaveValue("11 95682-4156");
    });

    it("Deve aplicar mascara para telefones fixos ao digitar no campo", () => {
        render(
            <Phone
                id="phone"
                label="Telefone Fixo"
                whichFormat="phone"
                required
                placeholder="Informe seu telefone fixo ou celular..."
                name="phone"
            />
        );

        const field = screen.getByLabelText("Telefone Fixo (campo obrigatório) (00) 0000-0000");

        fireEvent.change(field, { target: { value: "1145165263" } });
        expect(field).toHaveValue("11 4516-5263");
    });

    it("Deve aplicar mascara para telefones fixos e celulares ao digitar no campo", () => {
        render(
            <Phone
                id="phone"
                label="Telefones fixos / Celular"
                whichFormat="both"
                required
                placeholder="Informe seu telefone fixo ou celular..."
                name="phone"
            />
        );

        const field = screen.getByLabelText("Telefones fixos / Celular (campo obrigatório) (00) 90000-0000 / (00) 0000-0000");

        fireEvent.change(field, { target: { value: "11956841201" } });
        expect(field).toHaveValue("11 95684-1201");
    });

    it("Deve aplicar manter o campo em branco ao digitar valores inválidos", () => {
        render(
            <Phone
                id="phone"
                label="Telefones fixos / Celular"
                whichFormat="both"
                required
                placeholder="Informe seu telefone fixo ou celular..."
                name="phone"
            />
        );

        const field = screen.getByLabelText("Telefones fixos / Celular (campo obrigatório) (00) 90000-0000 / (00) 0000-0000");

        fireEvent.change(field, { target: { value: "adasdasdasd" } });
        expect(field).toHaveValue("");
    });

    it("Deve aplicar mascara para telefones fixos ao colar no campo", () => {
        render(
            <Phone
                id="phone"
                label="Telefone Fixo"
                whichFormat="phone"
                required
                placeholder="Informe seu telefone fixo ou celular..."
                name="phone"
            />
        );

        const field = screen.getByLabelText("Telefone Fixo (campo obrigatório) (00) 0000-0000");

        fireEvent.paste(field, { clipboardData: { getData: () => '1145165263' } });
        expect(field).toHaveValue("11 4516-5263");
    });

    it("Deve aplicar mascara para telefones fixos e celulares ao colar no campo", () => {
        render(
            <Phone
                id="phone"
                label="Telefones fixos / Celular"
                whichFormat="both"
                required
                placeholder="Informe seu telefone fixo ou celular..."
                name="phone"
            />
        );

        const field = screen.getByLabelText("Telefones fixos / Celular (campo obrigatório) (00) 90000-0000 / (00) 0000-0000");

        fireEvent.paste(field, { clipboardData: { getData: () => '11956841201' } });
        expect(field).toHaveValue("11 95684-1201");
    });

    it("Deve aplicar manter o campo em branco ao colar valores inválidos", () => {
        render(
            <Phone
                id="phone"
                label="Telefones fixos / Celular"
                whichFormat="both"
                required
                placeholder="Informe seu telefone fixo ou celular..."
                name="phone"
            />
        );

        const field = screen.getByLabelText("Telefones fixos / Celular (campo obrigatório) (00) 90000-0000 / (00) 0000-0000");

        fireEvent.paste(field, { clipboardData: { getData: () => 'asdasdas' }, });
        expect(field).toHaveValue("");
    });

    it("Deve receber o valor formatado através da função onChange", () => {
        const onChange = jest.fn();

        render(
            <Phone
                id="phone"
                label="Telefones fixos / Celular"
                whichFormat="both"
                required
                placeholder="Informe seu telefone fixo ou celular..."
                name="phone"
                onChange={onChange}
            />
        );

        const field = screen.getByLabelText("Telefones fixos / Celular (campo obrigatório) (00) 90000-0000 / (00) 0000-0000");

        fireEvent.change(field, { target: { value: "11956841201" } });

        waitFor(() => {
            expect(onChange).toHaveBeenCalledWith({ target: { value: "(11) 95684-1201" } });
        });
    })

    it("Deve receber o valor formatado através da função onPaste", () => {
        const onPaste = jest.fn();

        render(
            <Phone
                id="phone"
                label="Telefones fixos / Celular"
                whichFormat="both"
                required
                placeholder="Informe seu telefone fixo ou celular..."
                name="phone"
                onChange={onPaste}
            />
        );

        const field = screen.getByLabelText("Telefones fixos / Celular (campo obrigatório) (00) 90000-0000 / (00) 0000-0000");

        fireEvent.paste(field, { clipboardData: { getData: () => '11956841201' }, });

        waitFor(() => {
            expect(onPaste).toHaveBeenCalledWith({ target: { value: "(11) 95684-1201" } });
        });
    })
})