import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Checkbox from "./Checkbox";


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
        expect(alert).toHaveTextContent("Componente: Checkbox");
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
        expect(alert).toHaveTextContent("Componente: Checkbox");
    });
})

describe("[Checkbox] - Conformidade com as diretrizes do eMAG", () => {

    it("Deve ser possível definir o valor inicial via props", () => {
        render(
            <Checkbox
                id="teste"
                label="teste"
                type="text"
                placeholder="Digite aqui..."
                checked={true}
            />
        )

        const field = screen.getByRole("checkbox");

        expect(field).toBeChecked();
    });    

    it("Deve ser invocado a função onChange ao selecionar ao checkbox", () => {
        const mockOnChange = jest.fn();

        render(
            <Checkbox
                id="teste"
                label="teste"
                type="text"
                placeholder="Digite aqui..."
                onChange={mockOnChange}
            />
        )

        const field = screen.getByRole("checkbox");

        fireEvent.change(field);

        waitFor(()=> {
            expect(mockOnChange).toHaveBeenCalled();
        })
    }); 
});