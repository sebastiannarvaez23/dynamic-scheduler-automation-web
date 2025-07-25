import { Fragment } from "react/jsx-runtime";

interface ButtonComponentProps {
    label: string;
    action: () => void;
}

const ButtonComponent = (props: ButtonComponentProps) => {
    return (
        <Fragment>
            <button onClick={props.action} type="button" className="
                active:bg-blue-800
                active:scale-100
                bg-blue-600
                duration-700
                ease-in-out
                focus:outline-none
                focus:ring-2
                focus:ring-blue-300
                font-medium
                hover:bg-blue-700
                hover:bg-blue-700
                hover:scale-102
                hover:shadow-lg
                m-1
                px-4 py-2
                rounded
                rounded
                shadow
                shadow-md
                text-white
                transform
                transition-all
                transition-shadow
                transition-transform
                w-fit
            ">{props.label}</button>
        </Fragment>
    );
}

export default ButtonComponent;