import { useState } from "react"
import { Dialog } from "."
import Button from "../fields/button/Button";

export default {
    title: "Dialog",
    component: Dialog.Root,
    tags: ['autodocs'],
}


export const ModalDialog = () => {
    const [show, setShow] = useState(false);

    return (
        <div>
            <h1>
                Conteúdo externo | Dialog Modal
            </h1>
            <Button onClick={() => setShow(true)}>
                Abrir dialog (modal)
            </Button>

            <Dialog.Root
                header={(
                    <Dialog.Header title="Dialog Modal" onCloseClick={() => setShow(false)} />
                )}
                body={(
                    <Dialog.Body>
                        <p>
                            Exemplo de dialog do tipo Modal. O foco é redirecionado para o primeiro elemento dentro do Dialog e o conteúdo atrás do Dialog fica inerte e bloqueado, evitando que o usuário
                            se perca durante a navegação.
                        </p>
                    </Dialog.Body>
                )}
                type="modal"
                show={show}
                onClose={() => setShow(false)} />
        </div>
    )
}

export const NonModalDialog = () => {
    const [show, setShow] = useState(false);

    return (
        <div>
            <h1>
                Conteúdo externo | Dialog NonModal
            </h1>
            <Button onClick={() => setShow(true)}>
                Abrir dialog (non-modal)
            </Button>

            <Dialog.Root
                header={(
                    <Dialog.Header title="Dialog NonModal" onCloseClick={() => setShow(false)} />
                )}
                body={(
                    <Dialog.Body>
                        <p>
                            Exemplo de dialog do tipo NonModal. O foco é redirecionado para o primeiro elemento dentro do Dialog e o conteúdo atrás do Dialog não fica bloqueado, permitindo que o usuário
                            navegue entre os elementos internos e externos do Dialog.
                        </p>
                    </Dialog.Body>
                )}
                type="non-modal"
                show={show}
                onClose={() => setShow(false)} />
        </div>
    )
}