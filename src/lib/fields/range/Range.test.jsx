import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Range from ".";

describe("[Range] - Violando diretriz 6.2 do eMAG", () => {
    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo label", () => {
        render(
            <Range id="volume" />
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
            <Range
                label="volume"
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

describe("[Range] - Conformidade com as diretrizes do eMAG", () => {
    it("Deve adicionar uma borda e outline na cor vermelho ao focar no campo de texto", () => {
        render(
            <Range
                id="volume"
                label="volume"
                max={1000}
                min={100}
                name="volume"
            />
        );

        const field = screen.getByLabelText("volume");
        field.focus();
        expect(field).toHaveFocus();

        waitFor(() => {
            expect(field).toHaveStyle("border: 1px solid #F00;");
            expect(field).toHaveStyle("outline:  2px solid #F00;")
        });
    });

    it("Deve definir a prop 'value' como padrão se estiver entre o valor mínimo e máximo.", () => {
        render(
            <Range
                id="volume"
                label="volume"
                max={1000}
                min={100}
                value={150}
                name="volume"
            />
        );

        const range = screen.getByLabelText("volume");

        expect(Number.parseInt(range.defaultValue)).toEqual(150);
    });

    it("Deve definir a prop 'min' como padrão se value for nulo e min for maior que o valor max", () => {
        // O valor padrão está entre o mínimo e o máximo especificados, a menos que o valor máximo seja menor que o mínimo, caso em que o padrão é definido como o atributo de valor mínimo.
        // https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input/range#value
        render(
            <Range
                id="volume"
                label="volume"
                max={100}
                min={1000}
                name="volume"
            />
        );

        const range = screen.getByLabelText("volume");

        expect(Number.parseInt(range.defaultValue)).toEqual(1000);
    });

    it("O valor padrão deverá estar entre o mínimo e o máximo especificados", () => {
        // O valor padrão está entre o mínimo e o máximo especificados, a menos que o valor máximo seja menor que o mínimo, caso em que o padrão é definido como o atributo de valor mínimo.
        // https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input/range#value
        render(
            <Range
                id="volume"
                label="volume"
                max={1000}
                min={0}
                name="volume"
            />
        );

        const range = screen.getByLabelText("volume");

        expect(Number.parseInt(range.defaultValue)).toEqual(500);
    });

    it("Deve alterar a orientação do Range ao definir orientation para vertical", () => {
        render(
            <Range
                id="volume"
                label="volume"
                max={1000}
                min={0}
                name="volume"
                orientation="vertical"
            />
        );

        const range = screen.getByLabelText("volume");

        waitFor(() => expect(range).toHaveStyle("writing-mode: vertical-lr"));
    })

    it("Deve ser possível customizar o componente via propriedade css", () => {
        render(
            <Range
                id="volume"
                label="volume"
                max={1000}
                min={0}
                name="volume"
                css={{
                    backgroundColor: "red",
                    margin: 10,
                    padding: 10
                }}

            />
        );

        const range = screen.getByLabelText("volume");

        waitFor(() => {
            expect(range).toHaveStyle({
                "background-color": "red",
                margin: 10,
                padding: 10
            })
        })
    })

    it("Deve invocar a função onChange passada via props", () => {
        const mockOnChange = jest.fn();

        render(
            <Range
                id="volume"
                label="volume"
                max={1000}
                min={0}
                name="volume"
                onChange={mockOnChange}
            />
        );

        const range = screen.getByLabelText("volume");

        fireEvent.change(range);

        waitFor(() => {
            expect(mockOnChange).toHaveBeenCalled()
        });
    })
});