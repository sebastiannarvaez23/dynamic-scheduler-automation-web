import { Fragment } from "react";


interface TitlePageProps {
    title: string;
}

export const TitlePage = (props: TitlePageProps) => {
    return (
        <Fragment>
            <h2 className="text-4xl">{props.title}</h2>
        </Fragment>
    );
}