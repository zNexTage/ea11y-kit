import Phone from "./Phone";

export default {
    title: "Phone (Campo de entrada para telefone)",
    component: Phone,
    tags: ['autodocs']
};

/**
 * O componente é renderizado apenas quando estiver em conformidade com as diretrizes do eMAG,
 * ou seja, quando todos os parâmetros forem passados corretamente.
 */
export const AccordingToGuidelines = () => (
    <Phone id="txtContato" isRequired label="Contato" name="contato" placeholder="Informe o seu fixo ou do seu celular" />
);

AccordingToGuidelines.storyName = "Conformidade com as diretrizes do eMAG";

/**
 * O componente aplica uma mascára para formatar os valores digitados em número de celular e telefone fixo.
 */
export const BothFormats = () => (
    <Phone
        id="txtContato"
        isRequired
        label="Contato"
        name="contato"
        whichFormat="both"
        placeholder="Informe o seu fixo ou do seu celular"
    />
);
BothFormats.storyName = "Formatação para celulares e telefones";

/**
 * O componente aplica uma mascára para formatar os valores digitados exclusivamente para número de celular.
 */
export const CellphoneFormat = () => (
    <Phone
        id="txtCelular"
        isRequired
        label="Celular"
        name="celular"
        whichFormat="cellphone"
        placeholder="Informe o número do seu celular"
    />
);

CellphoneFormat.storyName = "Formatação para número de celular";

/**
 * O componente aplica uma mascára para formatar os valores digitados exclusivamente para números de telefone fixo.
 */
export const LandLineFormat = () => (
    <Phone
        id="txtFixo"
        isRequired
        label="Telefone fixo"
        name="fixo"
        whichFormat="phone"
        placeholder="Informe o número do seu telefone fixo"
    />
);

LandLineFormat.storyName = "Formatação para número de telefone fixo";


/**
 * Será listado todas as diretrizes violadas caso haja alguma inconformidade com as diretrizes do eMAG. 
 */
export const NonCompliace = {
    component: Phone
};
NonCompliace.storyName = "Inconformidade com as diretrizes do eMAG";