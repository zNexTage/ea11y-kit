import { useRef } from "react";
import style from "./Color.module.css";

const Color = ({
    id,
    name,
    label
}) => {
    const colorRef = useRef();

    return (
        <div className={style.ColorContainer}>
            <div>
                <label htmlFor={id}>
                    {label}
                </label>
                <input
                    ref={colorRef}
                    className={style.Color} type="color" name={name} id={id} />
            </div>
        </div>
    )
}

export default Color;