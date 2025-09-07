import { Fragment } from "react/jsx-runtime";

interface ButtonComponentProps {
    label: string;
    type: "submit" | "reset" | "button" | undefined;
    action: () => void;
}

const ButtonComponent = (props: ButtonComponentProps) => {
    return (
        <Fragment>
            <button
                onClick={props.action}
                type={props.type}
                className={`
                    bg-[#1a1a1a]
                    border
                    border-transparent
                    rounded-[8px]
                    px-[1.2em]
                    py-[0.6em]
                    text-[1em]
                    font-medium
                    font-inherit
                    text-white
                    transition
                    transition-colors
                    duration-200
                    hover:border-[#646cff]
                    hover:shadow-xl
                    focus:outline
                    focus:outline-[4px]
                    focus:outline-auto
                    focus:outline-webkit-focus-ring-color
                    cursor-pointer
                    m-1
                    `}
            >
                {props.label}
            </button>
        </Fragment>
    );
};

export default ButtonComponent;
