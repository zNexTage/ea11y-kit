import Image from "../../lib/images/image/Image"

/**
 * Testando o componente Image do ea11y-kit
 * 
 * 1. Permite o uso do atributo alt
 *  1.1 Não permite omitir o atributo alt
 * 2. Renderiza o conteúdo do alt caso não seja possível renderizar a imagem.
 * @returns 
 */
const ImageExample = () => {
    return (
        <>
            {/* utilizando src de uma imagem existente  */}
            <Image
                css={{maxWidth: 500,width: "100%",height: "100%",objectFit: "cover",display: "block",marginBottom: 50}}
                alt="Antiga Estação Ferroviária de Paranapiacaba em um dia nublado, com uma estrutura histórica de tijolos e um relógio de torre no centro."
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Esta%C3%A7%C3%A3o_de_Paranapiacaba_2.jpg/800px-Esta%C3%A7%C3%A3o_de_Paranapiacaba_2.jpg" />
            
            
            {/* utilizando src de uma imagem inexistente  */}
            <Image
                css={{maxWidth: 500,width: "100%",height: "100%",objectFit: "cover",display: "block",marginBottom: 50}}
                alt="Antiga Estação Ferroviária de Paranapiacaba em um dia nublado, com uma estrutura histórica de tijolos e um relógio de torre no centro."
                src="https://imagem/invalid.png" />

            <br />
            {/* omitindo atributo alt  */}
            <Image
                css={{maxWidth: 500,width: "100%",height: "100%",objectFit: "cover",display: "block",marginBottom: 50
                }}                
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Esta%C3%A7%C3%A3o_de_Paranapiacaba_2.jpg/800px-Esta%C3%A7%C3%A3o_de_Paranapiacaba_2.jpg" />

        </>

    )
}

export default ImageExample;