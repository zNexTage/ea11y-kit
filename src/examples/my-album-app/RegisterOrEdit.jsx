import { styled } from "@stitches/react";

import Header from "./Header";
import AlbumForm from "./AlbumForm";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog } from "../../lib/dialog";
import { useEffect, useState } from "react";
import Button from "../../lib/fields/button/Button";

const Main = styled("main", {});


/**
 * Apenas para testes. Página para registro de álbum.
 * @returns 
 */
const RegisterOrEdit = ({ database }) => {

    const params = useParams();
    const albumId = params?.albumId;

    const album = database.getById(albumId);

    const navigate = useNavigate();

    const [successModal, setSuccessModal] = useState({
        show: false,
        album: null
    });

    const onSubmit = data => {
        let result = null;
        if (!album) {
            result = database.add(data);
        } else {
            result = database.update(albumId, data);
        }

        setSuccessModal({
            album: result,
            show: true
        })
    }

    const onSuccessDialogCloseClick = () => {
        setSuccessModal({
            album: null,
            show: false
        })
    }

    const onBackToMenuClick = () => {
        navigate("/");
    }

    useEffect(() => {
        const title = document.getElementsByTagName("title")[0];

        if (!albumId) {
            title.textContent = 'ea11y-kit | Teste | Registrar álbum';
        } else {
            title.textContent = 'ea11y-kit | Teste | Editar álbum';
        }
    }, [albumId]);

    return (
        <>
            <Header />

            <Main id="content" css={{ margin: 5, padding: 5 }}>
                <div>

                    <h1>
                        {!albumId ? "Registrar álbum" : "Editar álbum"}
                    </h1>
                    <br />
                    <AlbumForm album={album} onSubmit={onSubmit} />
                </div>

                <Dialog.Root
                    show={successModal.show}
                    onClose={onSuccessDialogCloseClick}
                    css={{ margin: "auto", padding: 10, boxSizing: "border-box" }}
                    header={<Dialog.Header onCloseClick={onSuccessDialogCloseClick} title={!albumId ? "Registro realizado com sucesso" : "Edição realizada com sucesso"} />}
                    body={<Dialog.Body css={{ marginTop: 20, }}>
                        <h2>
                            {
                                !albumId ?
                                    `Álbum ${successModal?.album?.album} cadastrado com sucesso.` :
                                    `Álbum ${successModal?.album?.album} edição com sucesso.`
                            }
                        </h2>

                        <Button onClick={onBackToMenuClick} css={{ marginTop: 20 }}>
                            Voltar para o menu
                        </Button>
                    </Dialog.Body>}
                    type="non-modal"
                />


            </Main>
        </>
    )
}

export default RegisterOrEdit;