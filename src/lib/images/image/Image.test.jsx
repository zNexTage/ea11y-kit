import { render, screen } from "@testing-library/react";
import Image from "./Image";
import guidelineMessages from "../../../utils/eMagGuidelineMessage";
import { PROVIDE_TEXT_ALTERNATIVE_TO_WEBSITE_IMAGES } from "../../../utils/eMagGuidelineCode";

describe("[Image] - Violando diretriz 3.6", () => {
    it("Deve emitir um alerta ao omitir o atributo obrigatório alt", () => {
        render(
            <Image
                src="https://saopauloparacriancas.com.br/wp-content/uploads/2017/09/SPPC-Paranapiacaba-600x400.jpeg"
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = `Violação da diretriz 3.6 - ${guidelineMessages.get(PROVIDE_TEXT_ALTERNATIVE_TO_WEBSITE_IMAGES)}`;

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
        expect(alert).toHaveTextContent("Componente: Image");
    });
});

describe("[Image] - Conformidade com o eMAG", () => {
    it("Deve renderizar a imagem juntamente com o texto alternativo", () => {
        render(
            <Image
                alt="Vista panorâmica de Paranapiacaba com céu azul e casas de estilo colonial"
                src="https://saopauloparacriancas.com.br/wp-content/uploads/2017/09/SPPC-Paranapiacaba-600x400.jpeg"
            />
        );

        const img = screen.getByRole("img");
        
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("alt", "Vista panorâmica de Paranapiacaba com céu azul e casas de estilo colonial");
    })
})