import { Avatar, Flex } from "@radix-ui/themes";

/**
 * Testando o componente Avatar do Radix UI
 * 
 * 1. Permite o uso do atributo alt. 
 *  1.1 Pode-se omitir o atributo alt
 * 2. Adota a estratégia de renderizar um componente fallback caso não seja possível renderizar a imagem
 * @returns 
 */
const AvatarExample = () => {
    return (
        <Flex gap="2">
            <Avatar
                alt="Logo"
                size="8"
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="A"
            />

            <Avatar
                size="8"
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="A"
            />

            <Avatar
                size="8"
                fallback="A"
            />

            <Avatar
                size="8"
                alt="Logo"
            />
        </Flex>
    )
}

export default AvatarExample;