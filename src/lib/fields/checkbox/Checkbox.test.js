import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Checkbox from "./Checkbox";
import * as KeyboardKeys from "../../../utils/KeyboardCodes";


describe("[Checkbox] - Violando diretriz 6.2 do eMAG", () => {

    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo label", () => {
        render(
            <Checkbox
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
    });

    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo id", () => {
        render(
            <Checkbox
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
    });
})

describe("[Checkbox] - Conformidade com as diretrizes do eMAG", () => {
    it("Deve aparecer a indicação (campo obrigatório) quando isRequired for igual a true", () => {
        render(
            <Checkbox
                id="teste"
                isRequired={true}
                label="teste"
                type="text"
                placeholder="Digite aqui..."
            />
        )

        const field = screen.getByRole("checkbox");

        waitFor(() => expect(field.parentElement).toHaveTextContent("(campo obrigatório)"));
    });

    it("Deve selecionar e desmarcar o campo ao foca-lo e pressionar enter", () => {
        render(
            <Checkbox
                id="teste"
                isRequired={true}
                label="teste"
                type="text"
                placeholder="Digite aqui..."
            />
        )

        const field = screen.getByRole("checkbox");

        // Seleciona o campo ao pressionar a tecla Enter
        fireEvent.keyDown(field, { code: KeyboardKeys.ENTER });
        expect(field).toBeChecked();

        // Desmarca o campo ao pressionar a tecla Enter
        fireEvent.keyDown(field, { code: KeyboardKeys.ENTER });
        expect(field).not.toBeChecked();

        // Seleciona o campo ao pressionar o Enter que fica junto com a parte numérica do teclado.
        fireEvent.keyDown(field, { code: KeyboardKeys.NUMPAD_ENTER });
        expect(field).toBeChecked();

        // Desmarca o campo ao pressionar o Enter que fica junto com a parte numérica do teclado.
        fireEvent.keyDown(field, { code: KeyboardKeys.NUMPAD_ENTER });
        expect(field).not.toBeChecked();
    });
});