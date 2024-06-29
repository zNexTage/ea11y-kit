import { styled } from "@stitches/react";
import React, { useEffect, useRef } from "react";
import Button from "../../fields/button/Button";

const DialogStyled = styled("dialog", {
    width: "95%"
});

const DialogCloseButtonContainer = styled("div", {
    textAlign: "right"
});

/**
 * @typedef Dialog
 * @property {React.ReactNode} header
 * @property {React.ReactNode} body
 * @property {boolean} show
 * @property {"modal"|"non-modal"} type
 * @property {()=> void} onClose
 * @property {import("@stitches/react").CSS} css
 * @property {import("@stitches/react").CSS} closeButtonCss
 */

/**
 * Dialog pré-configurado com as diretrizes do eMAG.
 * 
 * Diretrizes adotadas
 * 
 * 1.9 – Não abrir novas instâncias sem a solicitação do usuário - o eMAG cita o seguinte sobre o uso de dialogs
 * "As janelas modais, como as lightbox, fazem com que o foco do teclado permaneça “atrás” da janela, ou seja, o usuário navegando pelo teclado não tem acesso ao conteúdo dessas janelas. 
 * Além disso, as janelas modais, em geral, não apresentam um bom nível de acessibilidade em dispositivos móveis"
 * nesse sentido, o componente Dialog foi feito utilizando o elemento dialog como base, que apresenta semântica e recursos nativos de acessibilidade, como:
 * atribuir o foco para os elementos internos do dialog; para dialog do tipo modal, o conteúdo externo fica inacessível, o que impede que os usuários se percam durante a navegação entre os itens do dialog; entre outros.
 * 
 *  
 * 
 * @param {Dialog} props
 * @returns 
 */
const Root = ({ header, body, type, show, onClose, css, closeButtonCss }) => {
    const dialog = useRef();

    useEffect(() => {
        dialog.current.addEventListener("cancel", event => {
            onClose && onClose();
        })
    }, []);

    const onShow = () => {
        // demonstra o modal de acordo com o tipo específicado.
        if (type === "modal") {
            // apresenta o dialog no formato modal
            dialog.current.showModal();
        } else {
            // apresenta o dialog no formato non-modal.
            dialog.current.show();
        }
    }

    useEffect(() => {
        if (!show) {
            dialog.current.close();
            onClose && onClose();
            return;
        }

        onShow();
    }, [show]);

    return (
        <DialogStyled
            css={css}
            ref={dialog}>
            {header}
            {body}
            <DialogCloseButtonContainer>
                <Button css={closeButtonCss} onClick={onClose}>
                    Fechar
                </Button>
            </DialogCloseButtonContainer>
        </DialogStyled>
    )
}

export default Root;
