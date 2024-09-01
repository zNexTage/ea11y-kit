import { styled } from "@stitches/react";

const DetailContent = styled("div", {
    padding: "0 15px" 
});
const DetailDialog = ({
    albumModal = null,

}) => {
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
    }
    return (
        <>
            <Dialog.Root
                onClose={onCloseDetailModal}
                css={{ margin: "auto" }}
                closeButtonCss={{
                    marginBottom: 10,
                    marginRight: 10
                }}
                header={
                    <Dialog.Header css={{ padding: 10 }}
                        onCloseClick={onCloseDetailModal}>
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
                        <DetailContent>
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
                        </DetailContent>
                    </Dialog.Body>
                }
                show={albumModal.show} />

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
                show={showRemoveModal} />
        </>
    )
}

export default DetailDialog;