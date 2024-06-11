import { render, screen, waitFor } from "@testing-library/react"
import DownloadLink from "./DownloadLink"

describe("[DownloadLink] - Violando diretriz 3.5", () => {
    test("Deverá ser renderizado um alerta de violação da diretriz 3.5 ao omitir o atributo extension", () => {
        render(
            <DownloadLink
                fileName="teste"
                href="http://teste.com"
                size="10"
                unit="KB"
            />
        )

        const title = "Violação das diretrizes do eMAG";
        const message = "Violação da diretriz 3.5 - Descrever links clara e sucintamente. Em links de arquivos para download, é necessário informar a extensão do arquivo. ";

        const alert = screen.queryByRole("alert");

        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
    })

    test("Deverá ser renderizado um alerta de violação da diretriz 3.5 ao omitir o atributo size", () => {
        render(
            <DownloadLink
                fileName="teste"
                href="http://teste.com"
                extension="JPG"
                unit="KB"
            />
        )

        const title = "Violação das diretrizes do eMAG";
        const message = "Violação da diretriz 3.5 - Descrever links clara e sucintamente. Em links de arquivos para download, é necessário informar o tamanho do arquivo. ";

        const alert = screen.queryByRole("alert");

        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
    })
});

describe("[DownloadLink] - Conformidade com as diretrizes do eMAG", () => {
    test("Diretriz 3.5 - Deverá ser renderizado o nome do arquivo, a extensão, o tamanho e unidade de medida", () => {
        render(
            <DownloadLink
                fileName="teste"
                href="http://teste.com"
                size="10"
                unit="KB"
                extension=".jpg"
            />
        )

        const link = screen.queryByRole("link");

        expect(link).toHaveTextContent("teste (.jpg, 10KB)")
    });

    test("Diretriz 4.4  - Deve adicionar uma borda e outline na cor vermelho ao focar no link", () => {
        render(
            <DownloadLink
                fileName="teste"
                href="http://teste.com"
                size="10"
                unit="KB"
                extension=".jpg"
            />
        )

        const link = screen.queryByRole("link");

        link.focus();
        expect(link).toHaveFocus();

        waitFor(() => {
            expect(link).toHaveStyle("border: 1px solid #F00;");
            expect(link).toHaveStyle("outline:  2px solid #F00;")
        });
    })
})

describe("[DownloadLink] - Omitindo outras propriedades", () => {
    test("Deverá ser renderizado um alerta ao omitir o atributo unit", () => {
        render(
            <DownloadLink
                fileName="teste"
                href="http://teste.com"
                extension="JPG"

            />
        )

        const message = "É necessário informar a unidade do tamanho do arquivo (Kb, Mb, Gb, etc).";

        const alert = screen.queryByRole("alert");

        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent(message);
    })
})