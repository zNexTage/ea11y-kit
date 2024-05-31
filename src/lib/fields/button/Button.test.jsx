import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Button from "./Button";

describe("[Button] - Conformidade com as diretrizes do eMAG", () => {
    it("Deve adicionar uma borda e outline na cor vermelho ao focar no botão.", () => {
        render(
            <Button>
                Enviar
            </Button>
        );

        const button = screen.getByRole("button");

        button.focus();
        expect(button).toHaveFocus();

        waitFor(() => {
            expect(button).toHaveStyle("border: 1px solid #F00;");
            expect(button).toHaveStyle("outline:  2px solid #F00;");
        })

    });

    it("Deve ser possível customizar o componente via propriedade css", () => {
        render(
            <Button css={{
                backgroundColor: "red",
                padding: 10,
                margin: 10
            }}>
                Enviar
            </Button>
        );

        const button = screen.getByRole("button");

        waitFor(() => {
            expect(button).toHaveStyle({
                'background-color': 'red',
                padding: 10,
                margin: 10
            })
        });
    });

    it("Deve ser invocado a função onClick ao clicar no botão", () => {
        const mockOnClick = jest.fn();

        render(
            <Button onClick={mockOnClick}>
                Enviar
            </Button>
        );

        const button = screen.getByRole("button");

        fireEvent.click(button);

        expect(mockOnClick).toHaveBeenCalled();
    })
})