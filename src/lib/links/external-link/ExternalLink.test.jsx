import { render, screen, waitFor } from "@testing-library/react";
import ExternalLink from "./ExternalLink";

describe("[ExternalLink] - Conformidade com as diretrizes do eMAG", () => {
    it("Diretriz 4.4  - Deve adicionar uma borda e outline na cor vermelho ao focar no link", () => {
        render(
            <ExternalLink
                href="https://emag.governoeletronico.gov.br/"
            >
                Saiba mais a respeito de acessibilidade
            </ExternalLink>
        )

        const link = screen.queryByRole("link");

        link.focus();
        expect(link).toHaveFocus();

        waitFor(() => {
            expect(link).toHaveStyle("border: 1px solid #F00;");
            expect(link).toHaveStyle("outline:  2px solid #F00;")
        });
    });

    it("Diretriz 1.9  - Deve adicionar a indicação (abre em nova janela)", () => {
        render(
            <ExternalLink
                href="https://emag.governoeletronico.gov.br/"
            >
                Saiba mais a respeito de acessibilidade
            </ExternalLink>
        )

        const link = screen.queryByRole("link");

        expect(link).toHaveTextContent("(abre em nova janela)");
    });
})