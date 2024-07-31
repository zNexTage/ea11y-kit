import { render, screen } from "@testing-library/react";
import Video from "./Video";

describe("[Video] - Violando diretriz 5.1 - Fornecer alternativa para vídeo", () => {
    it("Deve renderizar um alerta ao omitir a alternativa textual, isto é, a propriedade textualAlternativeFile", () => {
        render(
            <Video
                sources={[{
                    src: "https://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4",
                    type: "video/mp4"
                }]}
                tracks={[ //define as legendas a serem usadas no áudio.
                    {
                        default: true,
                        label: "Português (Brasil)",
                        src: 'legenda.vtt',
                        srcLang: "br"
                    },
                ]}
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "Violação da diretriz 5.1 - Fornecer alternativa para vídeo";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
        expect(alert).toHaveTextContent("Componente: Video");
    });

    it("Deve renderizar um alerta ao omitir a legendas, isto é, a propriedade tracks", () => {
        render(
            <Video
                sources={[{
                    src: "https://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4",
                    type: "video/mp4"
                }]}
                textualAlternativeFile={{
                    extension: ".txt",
                    fileName: "Transcrição textual da demonstração do jogo Sintel",
                    href: "file.txt",
                    size: 1,
                    unit: "KB"
                }}
            // tracks={[ //define as legendas a serem usadas no áudio.
            //     {
            //         default: true,
            //         label: "Português (Brasil)",
            //         src: 'legenda.vtt',
            //         srcLang: "br"
            //     },
            // ]}
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const message = "Violação da diretriz 5.1 - Fornecer alternativa para vídeo";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent(message);
        expect(alert).toHaveTextContent("Componente: Video");
    });
});

describe("[Video] - Omitindo outros atributos", () => {
    it("Deve renderizar um alerta ao omitir o link dos vídeos.", () => {
        render(
            <Video
                // sources={[{
                //     src: "https://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4",
                //     type: "video/mp4"
                // }]}
                textualAlternativeFile={{
                    extension: ".txt",
                    fileName: "Transcrição textual da demonstração do jogo Sintel",
                    href: "teste.txt",
                    size: 1,
                    unit: "KB"
                }}
                tracks={[ //define as legendas a serem usadas no vídeo.
                    {
                        default: true,
                        label: "Português (Brasil)",
                        src: 'audio.vtt',
                        srcLang: "br"
                    },
                ]}
            />
        );

        const title = "Violação das diretrizes do eMAG";

        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();

        expect(alert).toHaveTextContent(title);
        expect(alert).toHaveTextContent("Componente: Video");
    })
})