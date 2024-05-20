import React from "react";
import Week from "./Week";

export default {
    title: "Campo de seleção de semana (Week)",
    component: Week,
    tags: ['autodocs'],
}

/**
 * O componente é renderizado apenas quando estiver em conformidade com as diretrizes do eMAG,
 * ou seja, quando todos os parâmetros forem passados corretamente.
 */
export const AccordingToGuidelines = () => (
    <Week
        id="semana"
        label="Em qual semana você gostaria de começar?"
        name="semana"
        required
        fallbackWeekProps={{
            required: true,
            weekField: {
                id: 'week',
                label: 'Que semana você gostaria de começar?',
                name: 'week'
            },
            yearField: {
                id: 'year',
                label: 'Em qual ano?',
                name: 'year',

            }
        }}
    />
);

AccordingToGuidelines.storyName = "Conformidade com as diretrizes do eMAG"

/**
 * Será listado todas as diretrizes violadas caso haja alguma inconformidade com as diretrizes do eMAG. 
 */
export const NonCompliace = {
    component: Week
};
NonCompliace.storyName = "Inconformidade com as diretrizes do eMAG";