import { styled } from "@stitches/react";
import Image from "../../lib/images/image";
import Header from "./Header";
import Button from "../../lib/fields/button/Button";
import { useEffect, useState } from "react";
import { Dialog } from "../../lib/dialog";
import { useNavigate } from "react-router-dom";

const StyledListItem = styled("li", {});

const StyledUL = styled("ul", {
    marginTop: 10, display: "inline-flex", flexWrap: "wrap", justifyContent: "center"
});

const AuthorInfo = styled("div", {
    display: "flex", flexDirection: "column"
})

const SpanAlbumAuthor = styled("span", {
    padding: 10,
    textAlign: "center"
});

const Main = styled("main", {});

const ModalContent = styled("div", {
    padding: "0 15px"
});

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
        navigate(`/Edit/${albumModal.album.id}#edit`);
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

    useEffect(()=>{
        const title = document.getElementsByTagName("title")[0];
        title.textContent = 'ea11y-kit | Teste | Listagem de álbums';
    }, []);


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

                <section>
                    <hgroup>
                        <h1 id="list">
                            Álbums
                        </h1>
                        <h2>
                            Minha lista de álbums
                        </h2>
                    </hgroup>
                    <StyledUL>
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
                                <AuthorInfo>
                                    <Image
                                        css={{
                                            maxHeight: 300,
                                            aspectRatio: 1 / 1,
                                            minHeight: "100%",
                                            objectFit: "cover",
                                            width: "100%"
                                        }} src={album.photo} alt={`Capa do álbum ${album.album}`} />
                                    <SpanAlbumAuthor>
                                        <b>
                                            {album.album}
                                        </b><br />
                                        {album.author}
                                    </SpanAlbumAuthor>
                                    <Button onClick={(event) => onShowInfoClick(event, album)}>
                                        Ver mais detalhes sobre o álbum
                                    </Button>
                                </AuthorInfo>
                            </StyledListItem>
                        ))}
                        {albums.length == 0 &&
                            <li>
                                Nenhum álbum para ser listado
                            </li>
                        }
                    </StyledUL>
                </section>

            </Main>

            <Dialog.Root
                onClose={onCloseDetailModal}
                css={{ margin: "auto" }}
                closeButtonCss={{
                    marginBottom: 10,
                    marginRight: 10
                }}
                header={
                    albumModal?.album &&
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
                    albumModal?.album &&
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
                        <ModalContent>
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
                        </ModalContent>
                    </Dialog.Body>
                }
                show={albumModal?.show} />

            <Dialog.Root
                onClose={onRemoveModalCloseClick}
                css={{ margin: "auto" }}
                closeButtonCss={{
                    marginBottom: 10,
                    marginRight: 10
                }}
                header={
                    albumModal?.album &&
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
                    albumModal?.album &&
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

export default List;