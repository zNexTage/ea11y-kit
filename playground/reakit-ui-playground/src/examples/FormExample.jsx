import { useState } from "react";
import { Button, Checkbox, Input, Radio, RadioGroup, useRadioState } from "reakit";
import {
    unstable_useFormState as useFormState,
    unstable_Form as Form,
    unstable_FormLabel as FormLabel,
    unstable_FormInput as FormInput,
    unstable_FormMessage as FormMessage,
    unstable_FormSubmitButton as FormSubmitButton,
} from "reakit/Form";

const FormExample = () => {
    const form = useFormState({
        values: { name: "" },
        onValidate: (values) => {
            if (!values.name) {
                const errors = {
                    name: "How can we be friends without knowing your name?",
                };
                throw errors;
            }
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });


    const [checked, setChecked] = useState([]);
    const toggle = (event) => {
        if (event.target.checked) {
            setChecked([...checked, event.target.value]);
        } else {
            setChecked(values => values.filter(v => v != event.target.value));
        }
    };

    const radio = useRadioState();


    return (
        <Form {...form}>
            <label htmlFor="gilad">
                <Checkbox name="participantes" id="gilad" value={"gilad"} checked={checked.includes("gilad")} onChange={toggle} />
                Gilad Gray
            </label>

            <label htmlFor="jason">
                <Checkbox name="participantes" id="jason" value={"jason"} checked={checked.includes("jason")} onChange={toggle} />
                Jason Killian
            </label>

            <label htmlFor="antoine">
                <Checkbox name="participantes" id="antoine" value={"antoine"} checked={checked.includes("antoine")} onChange={toggle} />
                Antoine Llorca
            </label>

            <br />

            <FormLabel name="name">
                Name
            </FormLabel>
            <FormInput {...form} name="name" placeholder="John Doe" />
            <FormMessage {...form} name="name" />

            <Input placeholder="input" />
            <br />
            <FormSubmitButton {...form}>Submit</FormSubmitButton>

            <br />

            <RadioGroup {...radio} aria-label="fruits">
                <label>
                    <Radio {...radio} value="apple" /> apple
                </label>
                <label>
                    <Radio {...radio} value="orange" /> orange
                </label>
                <label>
                    <Radio {...radio} value="watermelon" /> watermelon
                </label>
            </RadioGroup>

            <br />

            <Button onClick={event => console.log("ALOOOO MUNDO")}>
                Confirmar
            </Button>
        </Form>
    )
}

export default FormExample;