import { Fragment } from "react/jsx-runtime";


interface ImageComponentProps {
    m: string;
}

const ImageComponent = (props: ImageComponentProps) => {
    return (
        <Fragment>
            <img
                src={props.m}
                alt="Creación de tarea"
                className="shadow-xl my-8 mx-auto w-70% h-130 rounded-xl shadow-md"
            />
        </Fragment>
    );
}

export default ImageComponent;