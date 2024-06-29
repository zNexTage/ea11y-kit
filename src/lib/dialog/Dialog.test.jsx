import { render, screen } from "@testing-library/react"
import { Dialog } from "."
import { fireEvent } from "@storybook/test";

describe("[Dialog] - Fechando o dialog", () => {
    beforeAll(() => {
        HTMLDialogElement.prototype.show = jest.fn();
        HTMLDialogElement.prototype.showModal = jest.fn();
        HTMLDialogElement.prototype.close = jest.fn();
    });

    it("Deve invocar onClose ao clicar no botão Fechar", () => {
        const onClose = jest.fn();

        render(
            <Dialog.Root
                header={(
                    <Dialog.Header title="teste">

                    </Dialog.Header>
                )}
                body={(
                    <Dialog.Body>

                    </Dialog.Body>
                )}

                type="modal"
                show
                onClose={onClose}
            />
        );

        const btnClose = screen.getByText("Fechar");

        fireEvent.click(btnClose);

        expect(onClose).toHaveBeenCalled();
    });

    it("Deve invocar onClose ao clicar no botão x no cabeçalho", () => {
        const onClose = jest.fn();

        render(
            <Dialog.Root type="modal" show
                body={(
                    <Dialog.Body>

                    </Dialog.Body>
                )}
                header={(
                    <Dialog.Header title="teste" onCloseClick={onClose} >

                    </Dialog.Header>
                )} />
        );

        const btnClose = screen.getByText("x");

        fireEvent.click(btnClose);

        expect(onClose).toHaveBeenCalled();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    })
});

describe("[Dialog] - Abringo o dialog", () => {
    it("Deve abrir o dialog no modo Modal", () => {
        const onShowModal = jest.fn();

        HTMLDialogElement.prototype.showModal = onShowModal;

        render(
            <Dialog.Root
                header={(
                    <Dialog.Header title="teste">

                    </Dialog.Header>
                )}
                body={(
                    <Dialog.Body>

                    </Dialog.Body>
                )}

                type="modal"
                show
                onClose={() => { }}
            />
        );

        expect(onShowModal).toHaveBeenCalled();
    })

    it("Deve abrir o dialog no modo NonModal", () => {
        const onShow = jest.fn();

        HTMLDialogElement.prototype.show = onShow;

        render(
            <Dialog.Root
                header={(
                    <Dialog.Header title="teste">

                    </Dialog.Header>
                )}
                body={(
                    <Dialog.Body>

                    </Dialog.Body>
                )}

                type="non-modal"
                show
                onClose={() => { }}
            />
        );

        expect(onShow).toHaveBeenCalled();
    })

    afterEach(() => {
        jest.restoreAllMocks();
    })
})