import Textbox from "../../lib/fields/textbox";
import UploadField from "../../lib/fields/upload-field/UploadField";
import Button from "../../lib/fields/button/Button";
import Image from "../../lib/images/image";
import { styled } from "@stitches/react";
import { useEffect, useState } from "react";

const Row = styled("div", {
    display: "flex",
    ">div": {
        flex: 1,
    }
});

const Form = styled("form", {});

const Fieldset = styled("fieldset", {});
const SubmitRow = styled("div", {});
const AlbumPhotoContainer = styled("div", {});

const AlbumForm = ({ onSubmit, album }) => {
    const [albumPhoto, setAlbumPhoto] = useState({
        src: "https://i0.wp.com/espaferro.com.br/wp-content/uploads/2024/06/placeholder-103.png?ssl=1",
        alt: "Imagem de espaço reservado sem conteúdo disponível"
    });

    useEffect(() => {
        if (!album) return;

        setAlbumPhoto({
            src: album.photo,
            alt: `Capa do álbum ${album.album}`
        });
    }, []);

    const handleSubmit = event => {
        event.preventDefault();

        const data = new FormData(event.target);

        onSubmit({
            photo: albumPhoto.src,
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
        <Form
            method="POST"
            onSubmit={handleSubmit}
            css={{

                display: "flex",
                justifyContent: "space-between"
            }}>
            <Fieldset css={{ padding: 10, flex: 1, border: "none" }}>
                <legend>
                    <b>
                        Dados do álbum
                    </b>
                </legend>
                <div>
                    <UploadField
                        onChange={onPhotoChange}
                        label="Anexe a capa do álbum"
                        name="photo"
                        id="album"
                        required
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
                            required
                            defaultValue={album?.author}
                            name="author" />
                        <Textbox
                            placeholder="Informe o nome do álbum"
                            label="Nome do álbum"
                            id="txtAlbum"
                            required
                            defaultValue={album?.album}
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
                            required
                            defaultValue={album?.recordLabel}
                            placeholder="Informe a gravadora" />
                        <Textbox
                            name="gender"
                            type="text"
                            id="txtGender"
                            label="Gênero"
                            required
                            defaultValue={album?.gender}
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
    )
}

export default AlbumForm;