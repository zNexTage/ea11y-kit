import { render, screen } from "@testing-library/react"
import { Table } from "."

describe("[Table] - Violando diretriz 3.9 - Em tabelas, utilizar títulos e resumos de forma apropriada", () => {
    it("Deve mostrar um alerta ao omitir o atributo title em caption", () => {
        render(
            <Table.Root

            />
        );

        const title = "Violação das diretrizes do eMAG";
        const message = "Violação da diretriz 3.9";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
    })
});

describe("[Table] - Conformidade com as diretrizes do eMAG", () => {
    it("Deve ser possível montar a tabela apenas com o corpo <tbody>", () => {
        render(
            <Table.Root
                caption={{ title: "Tabela 1 - Teste" }}
                tbodyChildren={(
                    <>
                        <Table.Row>
                            <Table.HeaderCell>
                                <Table.DataCell>
                                    Nome
                                </Table.DataCell>
                            </Table.HeaderCell>
                        </Table.Row>

                        <Table.Row>
                            <Table.HeaderCell>
                                <Table.DataCell>
                                    Ayrton Senna
                                </Table.DataCell>
                            </Table.HeaderCell>
                        </Table.Row>
                    </>
                )}
            />
        );

        const table = screen.getByRole("table");

        expect(table).toBeInTheDocument(table);
    });

    it("Deve renderizar o título da tabela", () => {
        render(
            <Table.Root
                caption={{ title: "Tabela 1 - Teste" }}
                tbodyChildren={(
                    <>
                        <Table.Row>
                            <Table.HeaderCell>
                                <Table.DataCell>
                                    Nome
                                </Table.DataCell>
                            </Table.HeaderCell>
                        </Table.Row>

                        <Table.Row>
                            <Table.HeaderCell>
                                <Table.DataCell>
                                    Ayrton Senna
                                </Table.DataCell>
                            </Table.HeaderCell>
                        </Table.Row>
                    </>
                )}
            />
        );

        const tableTitle = screen.queryByText("Tabela 1 - Teste");

        expect(tableTitle).toBeInTheDocument();
    });

    it("Deve atribuir um resumo (summary) para a tabela através da prop summary", () => {
        render(
            <Table.Root
                summary="Vitórias do Ayrton Senna"
                caption={{ title: "Tabela 1 - Teste", }}
                tbodyChildren={(
                    <>
                        <Table.Row>
                            <Table.HeaderCell>
                                <Table.DataCell>
                                    Nome
                                </Table.DataCell>
                            </Table.HeaderCell>
                        </Table.Row>

                        <Table.Row>
                            <Table.HeaderCell>
                                <Table.DataCell>
                                    Ayrton Senna
                                </Table.DataCell>
                            </Table.HeaderCell>
                        </Table.Row>
                    </>
                )}
            />
        );

        const table = screen.getByRole("table");

        expect(table).toHaveAttribute("summary", "Vitórias do Ayrton Senna");
    })
})