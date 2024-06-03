import { Table } from "../../lib/table";

const data = [
    { product: "Maçã", price: 1, quantity: 50 },
    { product: "Banana", price: 0.5, quantity: 100 },
    { product: "Laranja", price: 0.75, quantity: 75 },
]
const currencyFormat = Intl.NumberFormat("pt-br", { style: "currency", currency: "BRL" });

const total = data.reduce((previousVal, currentValue) => {
    const total = currentValue.price * currentValue.quantity;

    return total + previousVal;
}, 0);

const TableExample = () => {
    return (
        <Table.Root
            caption={{
                title: "Tabela 1 - Lista de Produtos",
                css: {
                    marginBottom: 10,
                    fontWeight: "bold"
                }
            }}
            summary="Tabela listando produtos"
            theadChildren={(
                <Table.Row>
                    <Table.HeaderCell>
                        Produto
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        Preço
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        Quantidade
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        Preço * Quantidade
                    </Table.HeaderCell>
                </Table.Row>
            )}
            tbodyChildren={(
                <>
                    {data.map(({ product, price, quantity }) => (
                        <Table.Row>
                            <Table.DataCell>
                                {product}
                            </Table.DataCell>
                            <Table.DataCell>
                                {currencyFormat.format(price)}
                            </Table.DataCell>
                            <Table.DataCell>
                                {quantity}
                            </Table.DataCell>
                            <Table.DataCell>
                                {price * quantity}
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </>
            )}
            tfootChildren={(
                <Table.Row>
                    <Table.HeaderCell scope="row" colSpan={3}>
                        Total
                    </Table.HeaderCell>
                    <Table.DataCell>
                        {currencyFormat.format(total)}
                    </Table.DataCell>
                </Table.Row>
            )}
        />
    )
}

export default TableExample;