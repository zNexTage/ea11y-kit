import Figure from "../../lib/images/figure/Figure"
import Image from "../../lib/images/image"



const FigureExample = () => (
    <Figure
        css={{
            maxWidth: 800
        }}
        caption="Antiga Estação Ferroviária de Paranapiacaba, localizada em Santo André, São Paulo, cercada por vegetação e conhecida pelo clima úmido e nevoeiro frequente.">
        <Image
            css={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
            }}
            alt="Antiga Estação Ferroviária de Paranapiacaba em um dia nublado, com uma estrutura histórica de tijolos e um relógio de torre no centro."
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Esta%C3%A7%C3%A3o_de_Paranapiacaba_2.jpg/800px-Esta%C3%A7%C3%A3o_de_Paranapiacaba_2.jpg" />
    </Figure>
)

export default FigureExample;