import Checkbox from "./Checkbox";


export default {
    label: "Checkbox",
    component: Checkbox,
    tags: ['autodocs']
};

/**
 * O componente é renderizado apenas quando estiver em conformidade com as diretrizes do eMAG,
 * ou seja, quando todos os parâmetros forem passados corretamente.
 */
export const AccordingToGuidelines = () => (
    <Checkbox
        id={"cbo"}
        label={"Salvar login?"}
        isRequired={true}
    />
);

AccordingToGuidelines.storyName = "Conformidade com as diretrizes do eMAG"

/**
 * Será listado todas as diretrizes violadas caso haja alguma inconformidade com as diretrizes do eMAG. 
 */
export const NonCompliace = () => (
    <Checkbox
    />
);

NonCompliace.storyName = "Inconformidade com as diretrizes do eMAG"