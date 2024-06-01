import PropTypes from "prop-types";
import { styled } from "@stitches/react"
import { useEffect, useState } from "react";
import GuidelineViolation from "../../exceptions/GuidelineViolation/GuidelineViolation";
import { IN_TABLES_USES_TITLE_AND_SUMMARIES_APPROPRIATELY } from "../../utils/eMagGuidelineCode";
import ComponentErrorList from "../../components/component-error-list";

/**
 * @typedef CaptionProps
 * @property {string} title
 * @property {import("@stitches/react").CSS} css
 */

/**
 * @typedef {CaptionProps & React.HTMLProps<HTMLTableCaptionElement>} ExtendedCaptionProps
 */

/**
 * @typedef TableProps
 * @property {ExtendedCaptionProps} caption
 * @property {string} summary
 * @property {React.ReactNode} theadChildren 
 * @property {React.ReactNode} tbodyChildren 
 * @property {React.ReactNode} tfootChildren 
 */

const TableStyled = styled("table", {
    width: "100%",
    borderCollapse: "collapse"
});


const Caption = styled("caption", {
    textAlign: "left"
});

/**
 * Componente raíz para a montagem de uma tabela pré-configurado com as diretrizes do eMAG.
 *   
 * 
 * Diretrizes adotadas:
 * 
 * 3.9 - Em tabelas, utilizar títulos e resumos de forma apropriada: a propriedade título é obrigatória para que contextualize a tabela. Além disso,
 * é possível oferecer mais informaçõe sobre a tabela através da propriedade summary. De acordo com o eMAG, o resumo da tabela (summary) deve ser informado
 * quando a tabela for extensa. Nesse sentido, summary é uma propriedade opcional.
 * 
 * 3.10 – Associar células de dados às células de cabeçalho: essa diretriz aborda a necessidade de estruturar corretamente a tabela, para tanto deve-se
 * utilizar apropriadamente o elemento "th" e "td", além de ser necessário utilizar "thead", "tbody" e "tfoot" para agrupar as seções da tabela. Nesse sentido, 
 * o componente adota o uso das tags thead, tbody e tfoot. O conteúdo de cada seção é informado via as propriedades: theadChildren, tbodyChildren e tfootChildren. Dessa forma,
 * basta passar para cada seção as linhas e colunas. 
 * outro ponto, a diretriz 3.10 cita que para tabelas mais complexas deve-se associar as células de dados com as células de cabeçalho. 
 * de acordo com o eMAG: "A maneira mais adequada de realizar esse procedimento é utilizar os atributos id/headers ou scope/col. No primeiro, pode-se associar qualquer célula de conteúdo a qualquer célula de cabeçalho, utilizando o mesmo valor para o atributo id e para o header. No segundo caso, a associação é automática, sendo mais utilizado em tabelas de associação direta, nas quais é dado o valor col para o atributo scope nos cabeçalhos. Nos exemplos a seguir, é possível verificar a utilização do id/headers e do scope/col."
 * <a href="https://emag.governoeletronico.gov.br/" target="_blank">Veja mais sobre essa diretriz aqui (abre em nova guia)</a>.
 *  Levando em conta que a associação deve ser feita em tabelas complexas, o componente não obrigará que seja informado "id/headers ou scope/col.". Entretanto,
 * para a situação descrita pela diretriz do eMAG, o uso de tais atributos deve ser realizado. 
 * 
 * @param {TableProps} props 
 * @returns 
 */
const Root = ({
    caption,
    summary,
    theadChildren,
    tbodyChildren,
    tfootChildren
}) => {
    const { title, css, ...rest } = caption || {};
    const [violations, setViolations] = useState([]);
    console.log(summary)

    useEffect(() => {
        const errorsAux = [];

        if (!title) {
            errorsAux.push(
                new GuidelineViolation(
                    IN_TABLES_USES_TITLE_AND_SUMMARIES_APPROPRIATELY,
                    "O atributo 'title' em 'caption' é obrigatório e deve ser informado para definir um título para a tabela"
                )
            )
        }

        setViolations([...errorsAux]);
    }, [title]);

    return (
        <>
            {
                violations.length === 0 &&
                <TableStyled
                    summary={summary}>
                    <Caption
                        css={css}
                        {...rest}>
                        {title}
                    </Caption>

                    <thead>
                        {theadChildren}
                    </thead>

                    <tfoot>
                        {tfootChildren}
                    </tfoot>

                    <tbody>
                        {tbodyChildren}
                    </tbody>

                </TableStyled>
            }
            {violations.length > 0 && <ComponentErrorList errors={violations} />}
        </>
    )
}

Root.propTypes = {
    summary: PropTypes.string,
    theadChildren: PropTypes.node,
    tbodyChildren: PropTypes.node,
    tfootChildren: PropTypes.node,
    caption: PropTypes.object
}

export default Root;