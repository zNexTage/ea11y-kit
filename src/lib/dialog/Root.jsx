import { styled } from "@stitches/react";
import React, { useEffect, useRef } from "react";
import Button from "../fields/button/Button";

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
 * 1.9 – Não abrir novas instâncias sem a solicitação do usuário - "As janelas modais, como as lightbox, fazem com que o foco do 
 * teclado permaneça “atrás” da janela, ou seja, o usuário navegando pelo teclado não tem acesso ao conteúdo dessas janelas. 
 * Além disso, as janelas modais, em geral, não apresentam um bom nível de acessibilidade em dispositivos móveis. 
 * Assim, se houver real necessidade de utilizar esse tipo de elemento, é preciso garantir que o foco seja remetido para o início do 
 * conteúdo da janela modal, que o conteúdo dentro da mesma seja acessível e que seja possível retornar facilmente para o site navegando pelo teclado."
 * nesse sentido, o foco é remetido para o conteúdo do dialog assim que ele é aberto. Além disso, o componente é feito para se adaptar a diversas telas.
 * 
 * Dialog modal - Defina o `type` para `modal`. O tipo modal bloqueia o conteúdo externo e coloca o conteúdo do Modal em foco, permitindo que o usuário navegue entre os 
 * elementos dentro do modal sem se perder com os conteúdos externos. Utiliza-se um dialog do tipo Modal para interromper a atividade do usuário e para apresentar
 * confirmação de ações críticas, exibição de mensagens importantes, entre outros.
 * 
 * Dialog non-modal - Defina o `type` para `non-modal`. O tipo non-modal não bloqueia o conteúdo externo e coloca o conteúdo do Dialog em foco, permitindo que o usuário navegue entre os 
 * elementos dentro do modal e com os conteúdos externos. Utiliza-se um dialog do tipo non-modal em situações não é preciso interromper a atividade do usuário e para apresentar
 * informações auxiliares, notificações, alertas, interações complementares, entre outros.
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
