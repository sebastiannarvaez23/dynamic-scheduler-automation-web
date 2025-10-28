import { Fragment } from "react";


interface SectionDocumentComponentProps {
    title: string;
    content: string;
    children: React.ReactNode;
}

const SectionDocumentComponent = (props: SectionDocumentComponentProps) => {
    return (
        <Fragment>
            <br />
            <div>
                <h2 className="text-2xl">{props.title}</h2>
            </div>
            <div className="mx-10">
                <br /><p>{props.content}</p>
                <br />{props.children}
            </div>
        </Fragment>
    );
}

export default SectionDocumentComponent;