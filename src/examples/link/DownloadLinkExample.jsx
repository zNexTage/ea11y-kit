import DownloadLink from "../../lib/links/download-link"

const DownloadLinkExample = () => {
    return (
        <DownloadLink
            fileName="Arquivo teste"
            extension=".pdf"
            size="3.14"
            unit="mb"
            href="https://acervo.cewdeb.br/acervos/conteudo/8d6506be-5d3f-4e88-900f-df8749d81c36"
        />
    )
}

export default DownloadLinkExample