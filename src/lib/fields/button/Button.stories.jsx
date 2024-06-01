import Button from "./Button";



export default {
    title: "Botão (Button)",
    component: Button,
    tags: ['autodocs']
};

/**
 * O componente é renderizado apenas quando estiver em conformidade com as diretrizes do eMAG,
 * ou seja, quando todos os parâmetros forem passados corretamente.
 */
export const AccordingToGuidelines = () => (
    <Button
    >
        Enviar
    </Button>
);

AccordingToGuidelines.storyName = "Conformidade com as diretrizes do eMAG";