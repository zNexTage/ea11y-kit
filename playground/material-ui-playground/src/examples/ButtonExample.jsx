import { Button, Fab, ToggleButton } from "@mui/material";
const ButtonExample = () => {
    return (
        <>
            <Button variant="contained">Text</Button>
            <Fab variant="extended">
                Navigate
            </Fab>

            <ToggleButton value="left">
                Teste
            </ToggleButton>

        </>
    )
}

export default ButtonExample;