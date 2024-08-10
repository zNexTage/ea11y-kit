import { Button, Fab, ToggleButton } from "@mui/material";
const ButtonExample = () => {
    return (
        <>
            {/* <Button variant="contained">Text</Button>
            <Fab variant="extended">
                Navigate
            </Fab>

            <ToggleButton value="left">
                Teste
            </ToggleButton> */}

            <Button style={{marginBottom: 10}} variant="text">Botão #01</Button>
            <br />

            <Button style={{marginBottom: 10}} variant="contained">Botão #02</Button>
            <br />

            <Button variant="outlined">Botão #03</Button>

        </>
    )
}

export default ButtonExample;