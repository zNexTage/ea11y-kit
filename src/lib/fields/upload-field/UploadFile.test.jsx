import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import UploadField from "./UploadField";

describe("[UploadFile] - Violando diretriz 6.2 do eMAG", () => {
    test("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo label", () => {
        render(
            <UploadField
                id="ID"
                accept="image/jpg"
                acceptDescription="Apenas imagens JPG"
            />
        );

        const title = "Violação das diretrizes do eMAG";
        const message = "Violação da diretriz 6.2 - Associar etiquetas aos seus campos";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
    });

    test("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo id", () => {
        render(
            <UploadField
                label="Anexe sua foto"
                accept="image/jpg"
                acceptDescription="Apenas imagens JPG"
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

describe("[UploadFile] - Violando diretriz 6.5 do eMAG", () => {
    it("Deverá ser renderizado um alerta de violação da diretriz 6.5 ao omitir o atributo acceptDescription", () => {
        render(
            <UploadField
                id="upload_file"
                label="Anexe sua foto"
                accept="image/jpg"
            />
        );

        const title = "Violação das diretrizes do eMAG";
        const message = "Violação da diretriz 6.5 - Fornecer instruções para entrada de dados";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
    })
});

describe("[Textbox] - Conformidade com as diretrizes do eMAG", () => {
    test("Deve aparecer a indicação (campo obrigatório) quando required for igual a true", () => {
        render(
            <UploadField
                id="ID"
                accept="image/jpg"
                required
                label="Anexe sua foto"
                acceptDescription="Apenas imagens JPG"
            />
        );

        const field = screen.getByLabelText("Anexe sua foto (campo obrigatório)");

        waitFor(() => expect(field.parentElement).toHaveTextContent("(campo obrigatório)"));
    })

    it("Deve adicionar uma borda e outline na cor vermelho ao focar no campo", () => {
        render(
            <UploadField
                id="ID"
                accept="image/jpg"
                required
                label="Anexe sua foto"
                acceptDescription="Apenas imagens JPG"
            />
        );

        const field = screen.getByLabelText("Anexe sua foto (campo obrigatório)");
        field.focus();
        expect(field).toHaveFocus();

        waitFor(() => {
            expect(field).toHaveStyle("border: 1px solid #F00;");
            expect(field).toHaveStyle("outline:  2px solid #F00;");
        });
    })

    it("Deve ser possível customizar o componente via a propriedade css", () => {
        render(
            <UploadField
                id="ID"
                accept="image/jpg"
                required
                label="Anexe sua foto"
                acceptDescription="Apenas imagens JPG"
                css={{
                    backgroundColor: "red",
                    margin: 10,
                    padding: 10
                }}
            />
        );

        const field = screen.getByLabelText("Anexe sua foto (campo obrigatório)");

        waitFor(() => {
            expect(field).toHaveStyle({
                "background-color": "red",
                margin: 10,
                padding: 10
            })
        });
    })

    it("Deve invocar a função onChange ao interagir com o componente", () => {
        const mockOnChange = jest.fn();

        render(
            <UploadField
                id="ID"
                accept="image/jpg"
                required
                label="Anexe sua foto"
                onChange={mockOnChange}
                acceptDescription="Apenas imagens JPG"
                css={{
                    backgroundColor: "red",
                    margin: 10,
                    padding: 10
                }}
            />
        );

        const field = screen.getByLabelText("Anexe sua foto (campo obrigatório)");

        fireEvent.change(field);

        expect(mockOnChange).toHaveBeenCalled();
    })
});