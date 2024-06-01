import React from "react";
import { Table } from ".";

export default {
    title: "Tabela (Table)",
    component: Table.Root,
    tags: ['autodocs'],
}

const wins = [
    { year: 1985, grandPrix: 'Portugal', position: 1 },
    { year: 1986, grandPrix: 'Spain', position: 1 },
    { year: 1987, grandPrix: 'Monaco', position: 1 },
    { year: 1993, grandPrix: 'Australia', position: 1 },
];

/**
 * O componente é renderizado apenas quando estiver em conformidade com as diretrizes do eMAG,
 * ou seja, quando todos os parâmetros forem passados corretamente.
 */
export const AccordingToGuidelines = () => (
    <Table.Root
        caption={{
            title: "Tabela 1 - Vitórias de Ayrton Senna"
        }}
        summary="Tabela listando todas as vitórias de Ayrton Senna"
        theadChildren={(
            <Table.Row>
                <Table.HeaderCell>
                    Ano
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Grande Prêmio
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Posição
                </Table.HeaderCell>
            </Table.Row>
        )}
        tbodyChildren={(
            <>
                {wins.map(({ year, grandPrix, position }, index) => (
                    <Table.Row key={index}>
                        <Table.DataCell>
                            {year}
                        </Table.DataCell>
                        <Table.DataCell>
                            {grandPrix}
                        </Table.DataCell>
                        <Table.DataCell>
                            {position}
                        </Table.DataCell>
                    </Table.Row>
                ))}
            </>
        )}
        tfootChildren={(
            <Table.Row>
                <Table.HeaderCell scope="row" colSpan={2}>
                    Total de Vitórias
                </Table.HeaderCell>
                <Table.DataCell>
                    {wins.length}
                </Table.DataCell>
            </Table.Row>
        )}
    />
);

AccordingToGuidelines.storyName = "Conformidade com as diretrizes do eMAG"

/**
 * Será demonstrado um alerta ao omitir o título da tabela.
 */
export const NonCompliace = ()=> (
    <Table.Root
        caption={{
        }}
        summary="Tabela listando todas as vitórias de Ayrton Senna"
        theadChildren={(
            <Table.Row>
                <Table.HeaderCell>
                    Ano
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Grande Prêmio
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Posição
                </Table.HeaderCell>
            </Table.Row>
        )}
        tbodyChildren={(
            <>
                {wins.map(({ year, grandPrix, position }, index) => (
                    <Table.Row key={index}>
                        <Table.DataCell>
                            {year}
                        </Table.DataCell>
                        <Table.DataCell>
                            {grandPrix}
                        </Table.DataCell>
                        <Table.DataCell>
                            {position}
                        </Table.DataCell>
                    </Table.Row>
                ))}
            </>
        )}
        tfootChildren={(
            <Table.Row>
                <Table.HeaderCell scope="row" colSpan={2}>
                    Total de Vitórias
                </Table.HeaderCell>
                <Table.DataCell>
                    {wins.length}
                </Table.DataCell>
            </Table.Row>
        )}
    />
);
NonCompliace.storyName = "Inconformidade com as diretrizes do eMAG";