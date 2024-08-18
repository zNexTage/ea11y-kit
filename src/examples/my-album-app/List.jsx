import { styled } from "@stitches/react";
import Image from "../../lib/images/image";
import Header from "./Header";
import Button from "../../lib/fields/button/Button";
import { useState } from "react";
import { Dialog } from "../../lib/dialog";
import { useNavigate } from "react-router-dom";

const StyledListItem = styled("li", {});

const Main = styled("main", {});

const List = ({ database }) => {
    const [albums, setAlbums] = useState(database.get());
    const [albumModal, setAlbumModal] = useState({ show: false, album: null });
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showSuccessRemove, setShowSuccessRemove] = useState(false);

    const navigate = useNavigate();

    const onShowInfoClick = (event, album) => setAlbumModal({ show: true, album });

    const onCloseDetailModal = () => setAlbumModal({ show: false, album: null });

    const onRemoveClick = () => {
        setShowRemoveModal(true);

    }

    const onEditClick = () => {
        navigate(`/Edit/${albumModal.album.id}`);
    }

    const onRemoveModalCloseClick = () => {
        setShowRemoveModal(false);
    }

    const onRemoveAlbumClick = () => {
        database.remove(albumModal.album.id);

        setAlbums(database.get());

        setAlbumModal({ show: false, album: null });
        setShowRemoveModal(false);

        setShowSuccessRemove(true);
    }


    return (
        <>
            <Header />
            {showSuccessRemove && <Dialog.Root
                onClose={() => setShowSuccessRemove(false)}
                show={showSuccessRemove}
                css={{ margin: "auto" }}
                type="non-modal"
                header={
                    <Dialog.Header onCloseClick={() => setShowSuccessRemove(false)}>
                        Álbum removido com sucesso
                    </Dialog.Header>
                }
            />}

            <Main css={{ padding: 5 }}>
                <h1>
                    Álbums
                </h1>
                <ul style={{ marginTop: 10, display: "inline-flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {albums.map((album) => (
                        <StyledListItem
                            key={album.id}
                            css={{
                                border: "1px solid #CCC",
                                marginBottom: 10,
                                borderRadius: 10,
                                listStyleType: "none",
                                margin: 10
                            }}>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Image
                                    css={{
                                        maxHeight: 300,
                                        aspectRatio: 1 / 1,
                                        minHeight: "100%",
                                        objectFit: "cover",
                                        width: "100%"
                                    }} src={album.photo} alt={`Capa do álbum ${album.album}`} />
                                <span style={{ padding: 10, textAlign: "center" }}>
                                    <b>
                                        {album.album}
                                    </b><br />
                                    {album.author}
                                </span>
                                <Button onClick={(event) => onShowInfoClick(event, album)}>
                                    Ver mais detalhes sobre o álbum
                                </Button>
                            </div>
                        </StyledListItem>
                    ))}
                    {albums.length == 0 &&
                        <li>
                            Nenhum álbum para ser listado
                        </li>
                    }
                </ul>

            </Main>

            {albumModal?.show &&
                <Dialog.Root
                    onClose={onCloseDetailModal}
                    css={{ margin: "auto" }}
                    closeButtonCss={{
                        marginBottom: 10,
                        marginRight: 10
                    }}
                    header={
                        <Dialog.Header css={{ padding: 10 }} onCloseClick={onCloseDetailModal}>
                            <h1>
                                {albumModal?.album?.album}
                            </h1>
                            <h2>
                                {albumModal?.album?.author}
                            </h2>
                        </Dialog.Header>
                    }
                    body={
                        <Dialog.Body css={{ padding: 10, display: "flex", flexDirection: "row" }}>
                            <Image
                                css={{
                                    maxWidth: 350,
                                    border: "2px solid #DDD",
                                    padding: 10,
                                    borderRadius: 10,
                                    minHeight: "100%",
                                    objectFit: "cover",
                                    width: "100%"
                                }}
                                src={albumModal?.album?.photo}
                                alt={`Capa do álbum ${albumModal?.album?.album}`} />
                            <div style={{ padding: "0 15px" }}>
                                <p>
                                    <b>Autor:</b> {albumModal?.album?.author}
                                </p>
                                <p>
                                    <b>Álbum:</b> {albumModal?.album?.album}
                                </p>
                                <p>
                                    <b>Gravadora:</b> {albumModal?.album?.recordLabel}
                                </p>
                                <p>
                                    <b>Gênero:</b> {albumModal?.album?.gender}
                                </p>
                                <br />
                                <div>
                                    <Button
                                        onClick={onEditClick}
                                        css={{ marginRight: 10 }}>
                                        Editar
                                    </Button>
                                    <Button
                                        onClick={onRemoveClick}>
                                        Remover
                                    </Button>
                                </div>
                            </div>
                        </Dialog.Body>
                    }
                    show={albumModal?.show} />}

            {showRemoveModal &&
                <Dialog.Root
                    onClose={onRemoveModalCloseClick}
                    css={{ margin: "auto" }}
                    closeButtonCss={{
                        marginBottom: 10,
                        marginRight: 10
                    }}
                    header={
                        <Dialog.Header css={{ padding: 10 }} onCloseClick={onRemoveModalCloseClick}>
                            <h1>
                                {albumModal?.album?.album}
                            </h1>
                            <h2>
                                {albumModal?.album?.author}
                            </h2>
                        </Dialog.Header>
                    }
                    body={
                        <Dialog.Body css={{ padding: 10 }}>
                            <p>
                                Deseja remover o álbum {albumModal?.album?.album}?
                            </p>
                            <br />
                            <div>
                                <Button onClick={onRemoveAlbumClick} css={{ marginRight: 10 }}>
                                    Sim
                                </Button>
                                <Button onClick={onRemoveModalCloseClick}>
                                    Não
                                </Button>
                            </div>
                        </Dialog.Body>
                    }
                    show={showRemoveModal} />}
        </>
    )
}

export default List;