import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RadioButton from "./RadioButton";
import * as KeyboardKeys from "../../../utils/KeyboardCodes";

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
    });
});

describe("[RadioButton] - Conformidade com as diretrizes do eMAG", () => {
    it("Deve aparecer a indicação (campo obrigatório) quando isRequired for igual a true", () => {
        render(
            <RadioButton
                id="teste"
                isRequired={true}
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
                isRequired={true}
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
                    isRequired={true}
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
        waitFor(() => {
            expect(firstRb).toBeChecked();
            expect(secondRb).not.toBeChecked();
        });

        // Ao selecionar o segundo RadioButton, o primeiro deve perder o status de selecionado.
        fireEvent.keyDown(secondRb, { code: KeyboardKeys.ENTER });
        waitFor(() => {
            expect(secondRb).toBeChecked();
            expect(firstRb).not.toBeChecked();
        });
    });

    it("Deve desmarcar o campo ao interagir com as setas", () => {
        render(
            <>
                <RadioButton
                    id="nightfall"
                    isRequired={true}
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
        waitFor(() => {
            expect(firstRb).toBeChecked();
            expect(secondRb).not.toBeChecked();
        })

        // ao navegar com a seta, o foco deverá ir para o próximo RadioButton e o status de selecionado deve ser perdido
        fireEvent.keyDown(firstRb, { code: KeyboardKeys.ARROW_DOWN });
        waitFor(() => { expect(firstRb).not.toBeChecked(); })

        fireEvent.keyDown(secondRb, { code: KeyboardKeys.ENTER });
        waitFor(() => {
            expect(secondRb).toBeChecked();
            expect(firstRb).not.toBeChecked();
        })

        fireEvent.keyDown(secondRb, { code: KeyboardKeys.ARROW_UP });
        waitFor(() => {
            expect(secondRb).not.toBeChecked();
        })
    });
});

