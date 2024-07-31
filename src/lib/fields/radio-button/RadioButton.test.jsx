import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RadioButton from "./RadioButton";
import * as KeyboardKeys from "../../../utils/KeyboardCodes";
import userEvent from "@testing-library/user-event";

describe("[RadioButton] - Violando diretriz 6.2 do eMAG", () => {
    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo label", () => {
        render(
            <RadioButton
                id="ID"
                name="teste"
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "Violação da diretriz 6.2 - Associar etiquetas aos seus campos";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
        expect(alert).toHaveTextContent("Componente: RadioButton");
    });

    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo id", () => {
        render(
            <RadioButton
                label="label"
                name="Teste"
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "Violação da diretriz 6.2 - Associar etiquetas aos seus campos";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
        expect(alert).toHaveTextContent("Componente: RadioButton");
    });
});

describe("[RadioButton] - Conformidade com as diretrizes do eMAG", () => {
    it("Deve aparecer a indicação (campo obrigatório) quando required for igual a true", () => {
        render(
            <RadioButton
                id="teste"
                required={true}
                label="teste"
            />
        )

        const field = screen.getByLabelText("teste (campo obrigatório)");

        waitFor(() => expect(field.parentElement).toHaveTextContent("(campo obrigatório)"));

    });

    it("Deve adicionar uma borda e outline na cor vermelho ao focar no campo de texto", () => {
        render(
            <RadioButton
                id="teste"
                required={true}
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
    });

    it("Deve selecionar e desmarcar o campo ao foca-lo e pressionar enter", () => {
        render(
            <>
                <RadioButton
                    id="nightfall"
                    required={true}
                    label="Nightfall"
                    name="blind guardian"
                />

                <RadioButton
                    id="mirror mirror"
                    label="Mirror Mirror"
                    name="blind guardian"
                />
            </>
        )

        const fields = screen.getAllByRole("radio");

        const firstRb = fields[0];
        const secondRb = fields[1];

        // Deve selecionar apenas o primeiro RadioButton
        fireEvent.keyDown(firstRb, { code: KeyboardKeys.ENTER });
        expect(firstRb).toBeChecked();
        expect(secondRb).not.toBeChecked();

        // Ao selecionar o segundo RadioButton, o primeiro deve perder o status de selecionado.
        fireEvent.keyDown(secondRb, { code: KeyboardKeys.ENTER });
        expect(secondRb).toBeChecked();
        expect(firstRb).not.toBeChecked();
    });

    it("Deve ser possível definir um valor inicial", () => {
        render(
            <>
                <RadioButton
                    id="nightfall"
                    label="Nightfall"
                    name="blind guardian"
                    checked
                />
            </>
        )

        const field = screen.getByLabelText("Nightfall");

        expect(field).toBeChecked();
    })

    it("Deve invocar a função onKeyDown passada via props", () => {
        const mockOnKeyDown = jest.fn();

        render(
            <>
                <RadioButton
                    id="nightfall"
                    label="Nightfall"
                    name="blind guardian"
                    onKeyDown={mockOnKeyDown}
                    checked
                />
            </>
        )

        const field = screen.getByLabelText("Nightfall");

        fireEvent.keyDown(field);

        expect(mockOnKeyDown).toHaveBeenCalled();
    })

    it("Deve invocar a função onChange passada via props", async () => {
        const mockOnChange = jest.fn();

        render(
            <>
                <RadioButton
                    id="nightfall"
                    label="Nightfall"
                    name="blind guardian"
                    onChange={mockOnChange}
                    checked={false}
                />
            </>
        )

        const field = screen.getByLabelText("Nightfall");

        userEvent.click(field);

        await waitFor(() => expect(mockOnChange).toHaveBeenCalled());
    })

    it("Deve ser possível customizar o componente via propriedade css", () => {
        render(
            <RadioButton
                id="nightfall"
                label="Nightfall"
                name="blind guardian"
                checked
                css={{
                    backgroundColor: 'red',
                    margin: 10,
                    padding: 10
                }}
            />
        )

        const field = screen.getByLabelText("Nightfall");

        waitFor(() => {
            expect(field).toHaveStyle({
                "background-color": 'red',
                margin: 10,
                padding: 10
            });
        })
    })
});

