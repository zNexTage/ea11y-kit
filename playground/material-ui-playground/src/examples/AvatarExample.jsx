import Avatar from '@mui/material/Avatar';

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
        <>

            {/* <Avatar
                size='80'
                src="https://assetsio.gnwcdn.com/max1_QWnkQA8.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp"
                sx={{ width: 100, height: 100 }}
            >
                MP
            </Avatar>
            <br />

            <Avatar
                alt='Max Payne'
                size='80'
                src="https://assetsio.gnwcdn.com/max1_QWnkQA8.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp"
                sx={{ width: 100, height: 100 }}
            />
            <br />

            <Avatar
                size='80'
                src="https://assetsio.gnwcdn.com/max1_QWnkQA8.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp"
                sx={{ width: 100, height: 100 }}
            />


            <h2>
                Imagens com src inválido
            </h2> */}

            <Avatar
                alt='Max Payne'
                size='80'
                src="https://assetsio.gnwcdn.com/max1_QWnkQA8.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp"
                sx={{ width: 100, height: 100 }}
            />

            <Avatar
                size='80'
                src="https://url-invalida/imagem_nao_existente.jpg"
                sx={{ width: 100, height: 100 }}
            >
                MP
            </Avatar>
            <br />

            <Avatar
                alt='Max Payne'
                size='80'
                src="https://url-invalida/imagem_nao_existente.jpg"
                sx={{ width: 100, height: 100 }}
            />
            <br />

            <Avatar
                size='80'
                src="https://url-invalida/imagem_nao_existente.jpg"
                sx={{ width: 100, height: 100 }}
            />
        </>
    )
}

export default AvatarExample;