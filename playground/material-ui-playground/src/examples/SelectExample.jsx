import { Box, FormControl, InputLabel, MenuItem, NativeSelect, Select, TextField } from "@mui/material"
import React from "react";

const SelectExample = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>

            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Age
            </InputLabel>
            <NativeSelect
                defaultValue={30}
                inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                }}
            >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
            </NativeSelect>

            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
        </Box>
    )
}

export default SelectExample;