import React from "react";
import Link from "./Link";

export default {
    title: "Link",
    component: Link,
    tags: ['autodocs'],
}

/**
 * adiciona a descrição (abre em nova guia) quando o link se refere a um destino externo
 */
export const ExternalLink = () => (
    <Link href="https://emag.governoeletronico.gov.br/" target="_blank">
        Saiba mais sobre as diretriz do eMAG
    </Link>
)

ExternalLink.storyName = "Link externo"


export const LocalLink = () => {
    return (
        <Link href="#sobre-nos">
            Saiba mais sobre nossa equipe
        </Link>
    )
}
LocalLink.storyName = "Link local";