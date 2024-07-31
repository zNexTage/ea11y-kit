import { render, screen } from "@testing-library/react";
import Figure from "./Figure";
import guidelineMessages from "../../../utils/eMagGuidelineMessage";
import { PROVIDE_TEXT_ALTERNATIVE_TO_WEBSITE_IMAGES } from "../../../utils/eMagGuidelineCode";
import Image from "../image";

describe("[Figure] - Violando diretriz 3.6", () => {
    it("Deverá emitir um alerta ao omitir o atributo caption (legenda)", () => {
        render(
            <Figure
            >
                <Image alt="Vista panorâmica da Vila de Paranapiacaba" src="https://saopauloparacriancas.com.br/wp-content/uploads/2017/09/SPPC-Paranapiacaba-600x400.jpeg" />
            </Figure>
        );

        const title = "Violação das diretrizes do eMAG";

        const message = `Violação da diretriz 3.6 - ${guidelineMessages.get(PROVIDE_TEXT_ALTERNATIVE_TO_WEBSITE_IMAGES)}`;

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);

        expect(alert).toHaveTextContent("Componente: Figure");
    });
});


describe("[Figure] - Conformidade com as diretrizes do eMAG", () => {
    it("Deve renderizar a imagem juntamente com o texto alternativo", () => {
        render(
            <Figure
                caption="Vista panorâmica da Vila de Paranapiacaba, um destino turístico conhecido por sua arquitetura histórica e belas paisagens naturais"
            >
                <Image
                    alt="Vista panorâmica da Vila de Paranapiacaba"
                    src="https://saopauloparacriancas.com.br/wp-content/uploads/2017/09/SPPC-Paranapiacaba-600x400.jpeg" />
            </Figure>
        );

        const image = screen.getByRole("img");

        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("alt", "Vista panorâmica da Vila de Paranapiacaba");
    });

    it("Deve renderizar a imagem juntamente com a legenda", () => {
        render(
            <Figure
                caption="Vista panorâmica da Vila de Paranapiacaba, um destino turístico conhecido por sua arquitetura histórica e belas paisagens naturais"
            >
                <Image
                    alt="Vista panorâmica da Vila de Paranapiacaba"
                    src="https://saopauloparacriancas.com.br/wp-content/uploads/2017/09/SPPC-Paranapiacaba-600x400.jpeg" />
            </Figure>
        );

        const caption = screen.getByText("Vista panorâmica da Vila de Paranapiacaba, um destino turístico conhecido por sua arquitetura histórica e belas paisagens naturais");

        expect(caption).toBeInTheDocument();
    });    
})