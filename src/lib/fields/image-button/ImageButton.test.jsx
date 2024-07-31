import { render, screen, waitFor } from "@testing-library/react"
import ImageButton from "./ImageButton"

describe("[ImageButton] - Violando diretriz 6.1", () => {
    it("Deve aparecer uma notificação na tela ao omitir o atributo alt", () => {
        render(
            <ImageButton
                src="https://raw.githubusercontent.com/mdn/learning-area/master/html/forms/image-type-example/login.png"
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "Para botões gráficos (<input type='image'> deve-se informar um texto alternativo. O alt é importante para que os leitores de tela descrevam a imagem aos usuários.";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
        expect(alert).toHaveTextContent("Componente: ImageButton");
    });
});

describe("[ImageButton] - Omitindo outros atributos", () => {
    it("Deverá ser renderizado um alerta ao omitir o atributo src", () => {
        render(
            <ImageButton
                id="teste"
                alt="teste"
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "É necessário atribuir para a propriedade `src` a url da imagem.";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
    });
});

describe("[ImageButton] - Conformidade com as diretrizes do eMAG", () => {
    it("Deve adicionar uma borda e outline na cor vermelho ao focar no campo de texto", () => {
        render(
            <ImageButton
                alt="teste"
                src="https://raw.githubusercontent.com/mdn/learning-area/master/html/forms/image-type-example/login.png"
            />
        );

        const button = screen.getByAltText("teste");
        button.focus();
        expect(button).toHaveFocus();

        waitFor(() => {
            expect(button).toHaveStyle("border: 1px solid #F00;");
            expect(button).toHaveStyle("outline:  2px solid #F00;")
        });
    });

    it("Deve ser possível customizar o componente via propriedade css", () => {
        render(
            <ImageButton
                alt="teste"
                css={{
                    width: 10,
                    height: 10
                }}
                src="https://raw.githubusercontent.com/mdn/learning-area/master/html/forms/image-type-example/login.png"
            />
        );

        const button = screen.getByAltText("teste");

        waitFor(() => {
            expect(button).toHaveStyle({
                width: 10,
                height: 10
            });
        });
    })
});