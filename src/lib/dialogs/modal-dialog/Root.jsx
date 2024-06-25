import { styled } from "@stitches/react";
import React, { useEffect, useRef } from "react";

const ModalDialogStyled = styled("dialog", {
    width: "100%",
    maxWidth: 700
});

/**
 * @typedef Dialog
 * @property {React.ReactNode} header
 * @property {React.ReactNode} body
 * @property {boolean} show
 * @property {"modal"|"non-modal"} type
 * @property {(event:React.MouseEvent<HTMLButtonElement>)=> void} onCloseClick
 */

/**
 * Dialog pré-configurado com as diretrizes do eMAG.
 * 
 * Diretrizes adotadas
 * 
 * 
 * @param {Dialog} props
 * @returns 
 */
const Root = ({ header, body, type, show }) => {
    const dialog = useRef();

    useEffect(()=>{
        if(!show){
            dialog.current.close();
            return;
        }

        // demonstra o modal de acordo com o tipo específicado.
        if(type === "modal"){
            // apresenta o dialog no formato modal
            dialog.current.showModal();
        } else{
            // apresenta o dialog no formato non-modal.
            dialog.current.show();
        }
    }, [show]);

    return (
        <ModalDialogStyled 
        ref={dialog}>
            {header}
            {body}
        </ModalDialogStyled>
    )
}

export default Root;
