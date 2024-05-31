import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Audio from "./Audio";
import React from "react";



describe("[Audio] - Violando diretriz 5.2 - Fornecer alternativa para áudio", () => {

    it("Deve renderizar um alerto ao omitir captionFile", () => {
        render(
            <Audio
                sources={[
                    {
                        src: "teste",
                        type: "audio/mp3"
                    }
                ]}
            />
        )

        const title = "Violação das diretrizes do eMAG";

        const message = "Violação da diretriz 5.2 - Fornecer alternativa para áudio";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
    });
})

describe("[Audio] - Omitindo atributos", () => {
    it("Deve renderizar um alerta ao omitir sources", () => {
        render(
            <Audio
                captionFile={{
                    extension: ".txt",
                    fileName: "Transcrição textual da demonstração do jogo Sintel",
                    href: "www.teste.com.br/transcricao.txt",
                    size: 1,
                    unit: "KB"
                }}
            />
        )

        const alert = screen.getByRole("alert");

        expect(alert).toHaveTextContent("Nenhum arquivo de áudio informado.");
    });
});

describe("[Audio] - Conformidade com o eMAG", () => {
    it("Deve alterar o texto do botão para Reproduzir ao clica-lo", () => {
        render(
            <Audio
                sources={[
                    {
                        src: "audio.mp3",
                        type: "audio/mp3"
                    }
                ]}
                captionFile={{
                    extension: ".txt",
                    fileName: "Transcrição textual da demonstração do jogo Sintel",
                    href: "ingles.txt",
                    size: 1,
                    unit: "KB"
                }}
                tracks={[
                    {
                        default: true,
                        label: "Português (Brasil)",
                        src: "audio.vtt",
                        srcLang: "br"
                    },
                ]}

            />
        )

        const btnStartAudio = screen.getByText("Reproduzir");

        fireEvent.click(btnStartAudio);

        waitFor(() => {
            expect(btnStartAudio).toHaveTextContent("Pausar");
        })
    });

    it("Deve alterar o texto do botão para Pausar ao clica-lo", () => {
        render(
            <Audio
                sources={[
                    {
                        src: "audio.mp3",
                        type: "audio/mp3"
                    }
                ]}
                captionFile={{
                    extension: ".txt",
                    fileName: "Transcrição textual da demonstração do jogo Sintel",
                    href: "transcricao.txt",
                    size: 1,
                    unit: "KB"
                }}
                tracks={[
                    {
                        default: true,
                        label: "Português (Brasil)",
                        src: "audio.vtt",
                        srcLang: "br"
                    },
                ]}

            />
        )

        const btnStartAudio = screen.getByText("Reproduzir");

        fireEvent.click(btnStartAudio);

        waitFor(() => {
            expect(btnStartAudio).toHaveTextContent("Pausar");
        })

        fireEvent.click(btnStartAudio);

        waitFor(() => {
            expect(btnStartAudio).toHaveTextContent("Reproduzir");
        })
    });

    it("Deve renderizar a área da legenda abaixo do componente", () => {
        render(
            <Audio
                sources={[
                    {
                        src: "audio.mp3",
                        type: "audio/mp3"
                    }
                ]}
                captionFile={{
                    extension: ".txt",
                    fileName: "Transcrição textual da demonstração do jogo Sintel",
                    href: "ingles.txt",
                    size: 1,
                    unit: "KB"
                }}
                tracks={[
                    {
                        default: true,
                        label: "Português (Brasil)",
                        src: "audio.vtt",
                        srcLang: "br"
                    },
                ]}

            />
        )

        const cboLegend = screen.getByLabelText("Idioma da legenda");
        expect(cboLegend).toBeInTheDocument();
    });

    it("Deve renderizar o arquivo textual do áudio abaixo do componente", () => {
        render(
            <Audio
                sources={[
                    {
                        src: "audio.mp3",
                        type: "audio/mp3"
                    }
                ]}
                captionFile={{
                    extension: ".txt",
                    fileName: "Transcrição textual da demonstração do jogo Sintel",
                    href: "ingles.txt",
                    size: 1,
                    unit: "KB"
                }}
                tracks={[
                    {
                        default: true,
                        label: "Português (Brasil)",
                        src: "audio.vtt",
                        srcLang: "br"
                    },
                ]}

            />
        )

        const fileLink = screen.getByText("Transcrição textual da demonstração do jogo Sintel (.txt 1KB)");

        expect(fileLink).toBeInTheDocument();
    })
})