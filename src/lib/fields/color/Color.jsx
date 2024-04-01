import { useEffect, useRef, useState } from "react";
import style from "./Color.module.css";

const Color = ({
    id,
    name,
    label
}) => {
    const [selectedColor, setSelectedColor] = useState("");
    const colorRef = useRef();

    /**
     * 
     * @param {InputEvent} event 
     */
    const onChange = event => {
        setSelectedColor(event.target.value);
    }

    useEffect(()=>{
        setSelectedColor(colorRef.current.value);
    }, []);

    return (
        <div>
            <div>
                <label htmlFor={id}>
                    {label}                    
                </label>
                <input
                        ref={colorRef}
                        onChange={onChange}
                        className={style.Color} type="color" name={name} id={id} />
            </div>
            <br />
            <span id="selected-color" aria-live="assertive" aria-label="Cor selecionada">
                <b>Cor selecionada:</b> <span   id="current-color">{selectedColor}</span>
            </span>
        </div>
    )
}

export default Color;