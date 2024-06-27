import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Slider, Switch, TextField } from "@mui/material";

const FormExample = () => {
    return (
        <form>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">Assign responsibility</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox name="gilad" />
                        }
                        label="Gilad Gray"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="jason" />
                        }
                        label="Jason Killian"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="antoine" />
                        }
                        label="Antoine Llorca"
                    />
                </FormGroup>
                <FormHelperText>Be careful</FormHelperText>
            </FormControl>

            <br />
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </FormControl>

            <br />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>

            <Slider defaultValue={30} aria-label="Volume" />

            <FormGroup>
                <FormControlLabel control={<Switch defaultChecked />} label="Label" />
                <FormControlLabel required control={<Switch />} label="Required" />
                <FormControlLabel disabled control={<Switch />} label="Disabled" />
            </FormGroup>

            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField id="standard-basic" label="Standard" variant="standard" />

            <br />
            <Button onClick={event => console.log("ALO MUNDO")} variant="contained">Enviar</Button>
        </form>
    )
}

export default FormExample;