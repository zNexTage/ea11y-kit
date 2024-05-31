import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Select from "./Select";

describe("[Select] - Violando diretriz 6.2 do eMAG", () => {
    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo label", () => {
        render(
            <Select
                id="selecione"
                name="selecione"
            >
                <option value='2023'>2023</option>
                <option value='2024'>2024</option>
                <option value='2022'>2022</option>
            </Select>
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "Violação da diretriz 6.2 - Associar etiquetas aos seus campos";

        waitFor(() => {
            const alert = screen.queryByRole("alert");
            expect(alert).toBeInTheDocument();

            expect(alert).toHaveTextContent(title);
            expect(alert).toHaveTextContent(message);
        });
    });

    it("Deverá ser renderizado um alerta de violação da diretriz 6.2 ao omitir o atributo id", () => {
        render(
            <Select
                label="selecione"
                name="selecione"
            >
                <option value='2023'>2023</option>
                <option value='2024'>2024</option>
                <option value='2022'>2022</option>
            </Select>
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "Violação da diretriz 6.2 - Associar etiquetas aos seus campos";

        waitFor(() => {
            const alert = screen.queryByRole("alert");
            expect(alert).toBeInTheDocument();

            expect(alert).toHaveTextContent(title);
            expect(alert).toHaveTextContent(message);
        })
    });
});

describe("[Select] - Omitindo outros atributos", () => {
    it("Deverá ser renderizado um alerta ao omitir o atributo name", () => {
        render(
            <Select
                id="selecione"
                label="selecione">
                <option value='2023'>2023</option>
                <option value='2024'>2024</option>
                <option value='2022'>2022</option>
            </Select>
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "É necessário especificar o nome (name) do campo. O atributo name é usado como referência quando os dados são enviados (https://www.w3schools.com/tags/att_name.asp).";

        waitFor(() => {
            const alert = screen.queryByRole("alert");
            expect(alert).toBeInTheDocument();

            expect(alert).toHaveTextContent(title);
            expect(alert).toHaveTextContent(message);
        });
    });

    it("Deverá ser renderizado um alerta ao omitir o atributo options", () => {
        render(
            <Select
                id="selecione"
                label="selecione"
            >
                <option value='2023'>2023</option>
                <option value='2024'>2024</option>
                <option value='2022'>2022</option>
            </Select>
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "É necessário especificar as opções de seleção.";

        waitFor(() => {
            const alert = screen.queryByRole("alert");
            expect(alert).toBeInTheDocument();

            expect(alert).toHaveTextContent(title);
            expect(alert).toHaveTextContent(message);
        });
    });
});

describe("[Select] - Conformidade com as diretrizes do eMAG", () => {
    it("Deve aparecer a indicação (campo obrigatório) quando required for igual a true", () => {
        render(
            <Select
                id="selecione"
                label="selecione"
                name="selecione"
                required>
                <option value='2023'>2023</option>
                <option value='2024'>2024</option>
                <option value='2022'>2022</option>
            </Select>
        )

        const field = screen.getByLabelText("selecione (campo obrigatório)");

        waitFor(() => expect(field.parentElement).toHaveTextContent("(campo obrigatório)"));

    });

    it("Deve adicionar uma borda e outline na cor vermelho ao focar no campo de texto", () => {
        render(
            <Select
                id="selecione"
                label="selecione"
                name="selecione">
                <option value='2023'>2023</option>
                <option value='2024'>2024</option>
                <option value='2022'>2022</option>
            </Select>
        );

        const field = screen.getByLabelText("selecione");
        field.focus();
        expect(field).toHaveFocus();

        waitFor(() => {
            expect(field).toHaveStyle("border: 1px solid #F00;");
            expect(field).toHaveStyle("outline:  2px solid #F00;")
        });
    })

    it("Deve ser possível customizar o componente via propriedade css", () => {
        render(
            <Select
                css={{
                    backgroundColor: "red",
                    margin: 10,
                    padding: 10
                }}
                id="selecione"
                label="selecione"
                name="selecione">
                <option value='2023'>2023</option>
                <option value='2024'>2024</option>
                <option value='2022'>2022</option>
            </Select>
        );

        const field = screen.getByLabelText("selecione");

        waitFor(() => {
            expect(field).toHaveStyle({
                'background-color': "red",
                margin: 10,
                padding: 10
            });
        });
    })

    it("Deve alterar o valor do select interagir com o elemento", () => {
        render(
            <Select
                css={{
                    backgroundColor: "red",
                    margin: 10,
                    padding: 10
                }}
                id="selecione"
                label="selecione"
                name="selecione">
                <option value='2023'>2023</option>
                <option value='2024'>2024</option>
                <option value='2022'>2022</option>
            </Select>
        );

        const field = screen.getByLabelText("selecione");

        fireEvent.change(field, { target: { value: '2022' } });

        expect(field).toHaveValue('2022');
    })

    
    it("Deve invocar a função onChange ao interagir com o elemento", () => {
        const onChange = jest.fn();

        render(
            <Select
                css={{
                    backgroundColor: "red",
                    margin: 10,
                    padding: 10
                }}
                id="selecione"
                label="selecione"
                onChange={onChange}
                name="selecione">
                <option value='2023'>2023</option>
                <option value='2024'>2024</option>
                <option value='2022'>2022</option>
            </Select>
        );

        const field = screen.getByLabelText("selecione");

        fireEvent.change(field, { target: { value: '2022' } });

        expect(field).toHaveValue('2022');

        expect(onChange).toHaveBeenCalled();
    })
});
