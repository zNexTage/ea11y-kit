import { render, screen, waitFor } from "@testing-library/react";
import Button from "./Button";

describe("[Button] - Conformidade com as diretrizes do eMAG", () => {
    it("Deve adicionar uma borda e outline na cor vermelho ao focar no botão.", () => {
        render(
            <Button text="Teste" />
        );

        const button = screen.getByRole("button");

        button.focus();
        expect(button).toHaveFocus();

        waitFor(() => {
            expect(button).toHaveStyle("border: 1px solid #F00;");
            expect(button).toHaveStyle("outline:  2px solid #F00;");
        })

    });
})