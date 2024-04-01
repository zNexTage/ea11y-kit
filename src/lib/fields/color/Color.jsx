import { useEffect, useRef, useState } from "react";
import style from "./Color.module.css";
import Textbox from "../textbox";

const Color = ({
    id,
    name,
    label
}) => {
    const [selectedColor, setSelectedColor] = useState("");
    const colorRef = useRef();
    const selectedColorRef = useRef();

    /**
     * 
     * @param {InputEvent} event 
     */
    const onChange = event => {
        setSelectedColor(event.target.value);
        selectedColorRef.current.focus();
    }

    useEffect(() => {
        setSelectedColor(colorRef.current.value);
    }, []);

    return (
        <div className={style.ColorContainer}>
            <div>
                <label htmlFor={id}>
                    {label}
                </label>
                <input
                    ref={colorRef}
                    onChange={onChange}
                    className={style.Color} type="color" name={name} id={id} />
            </div>
            <Textbox

                id="txtSelectedColor"
                label="Cor selecionada"
                placeholder="Cor selecionada"
                type="text"
                aria-live="polite"
                extraAttributes={{
                    value: selectedColor,
                    readOnly: true,
                    ref: selectedColorRef
                }}
            />
            {/* <span ref={selectedRef} id="selected-color" role="status" aria-live="polite" aria-label="Cor selecionada">
                <b>Cor selecionada:</b> <span id="current-color"></span>
            </span> */}
        </div>
    )
}

export default Color;