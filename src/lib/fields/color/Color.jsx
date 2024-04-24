import style from "./Color.module.css";
import baseStyle from "../../Base.module.css";

const Color = ({
    id,
    name,
    label
}) => {
    return (
        <div>
            <label htmlFor={id}>
                {label}
            </label>
            <input
                className={`${style.Color} ${baseStyle.Highlight}`}
                type="color"
                name={name}
                id={id}
            />
        </div>
    )
}

export default Color;