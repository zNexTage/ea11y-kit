import { useState } from "react";
import { Dialog } from "../../../lib/dialogs/modal-dialog";
import Button from "../../../lib/fields/button/Button";

const ModalDialogExample = () => {
    const [show, setShow] = useState(true);

    return (
        <>
            <Button onClick={() => setShow(true)}>
                Abrir modal
            </Button>
            <Dialog.Root
                show={show}
                onClose={() => setShow(false)}
                type="modal"
                body={(
                    <Dialog.Body>
                        <p>
                            Esse é o corpo do modal
                        </p>
                    </Dialog.Body>
                )}
                header={(
                    <Dialog.Header
                        onCloseClick={() => setShow(false)}
                        title={"Teste"}>
                        <p>
                            Testando dialog
                        </p>
                    </Dialog.Header>
                )}
            />
        </>
    )
}

export default ModalDialogExample;