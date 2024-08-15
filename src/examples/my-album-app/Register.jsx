import { styled } from "@stitches/react";
import Textbox from "../../lib/fields/textbox";
import UploadField from "../../lib/fields/upload-field/UploadField";
import Header from "./Header";
import Button from "../../lib/fields/button/Button";
import Image from "../../lib/images/image";
import { useState } from "react";

const Row = styled("div", {
    display: "flex",
    ">div": {
        flex: 1,
    }
});

const Form = styled("form", {});

const Fieldset = styled("fieldset", {});
const SubmitRow = styled("div", {});

const Main = styled("main", {});

const AlbumPhotoContainer = styled("div", {});

/**
 * Apenas para testes. Página para registro de álbum.
 * @returns 
 */
const Register = ({ database }) => {
    const [albumPhoto, setAlbumPhoto] = useState({
        src: "https://i0.wp.com/espaferro.com.br/wp-content/uploads/2024/06/placeholder-103.png?ssl=1",
        alt: "Imagem de espaço reservado sem conteúdo disponível"
    });

    const onSubmit = event => {
        event.preventDefault();

        const data = new FormData(event.target);
        database.add({
            photo: data.get("photo"),
            author: data.get("author"),
            album: data.get("album"),
            recordLabel: data.get("record_label"),
            gender: data.get("gender"),
        });
    }

    const onPhotoChange = event => {
        const photo = URL.createObjectURL(event.target.files[0]);

        setAlbumPhoto({ alt: "Ilustração da capa do álbum anexada.", src: photo });
    }
    return (
        <>
            <Header />
            <Main css={{ margin: 5, padding: 5 }}>
                <h1>
                    Registrar álbum
                </h1>
                <br />
                <Form method="POST" onSubmit={onSubmit} css={{

                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Fieldset css={{ padding: 10, flex: 1, border: "none" }}>
                        <div>
                            <UploadField
                                onChange={onPhotoChange}
                                label="Anexe a capa do álbum"
                                name="photo"
                                id="album"
                            />
                            <Row css={{
                                marginTop: 10
                            }}>
                                <Textbox
                                    containerCss={{
                                        marginRight: 10
                                    }}
                                    placeholder="Informe o nome do autor"
                                    label="Nome do autor"
                                    id="txtAutor"
                                    name="author" />
                                <Textbox
                                    placeholder="Informe o nome do álbum"
                                    label="Nome do álbum"
                                    id="txtAlbum"
                                    name="album" />
                            </Row>
                            <Row css={{
                                marginTop: 10
                            }}>
                                <Textbox
                                    containerCss={{
                                        marginRight: 10
                                    }}
                                    name="record_label"
                                    type="text"
                                    id="txtRecordLabel"
                                    label="Gravadora"
                                    placeholder="Informe a gravadora" />
                                <Textbox
                                    name="gender"
                                    type="text"
                                    id="txtGender"
                                    label="Gênero"
                                    placeholder="Informe o gênero" />

                            </Row>
                        </div>
                        <SubmitRow css={{ textAlign: "end" }}>
                            <Button type="submit" css={{ marginTop: 15 }}>
                                Confirmar
                            </Button>
                        </SubmitRow>

                    </Fieldset>

                    <AlbumPhotoContainer css={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ textAlign: "center" }}>
                            <b>
                                Capa do álbum
                            </b>
                        </span>
                        <Image
                            css={{
                                maxWidth: 350,
                                width: "100%",
                                flex: 1,
                                objectFit: "cover"
                            }}
                            alt={albumPhoto.alt}
                            src={albumPhoto.src} />
                    </AlbumPhotoContainer>
                </Form>

            </Main>
        </>
    )
}

export default Register;