import { Fragment } from "react/jsx-runtime";

interface DbounceComponentProps {
    search: string;
    placeholder: string;
    label: string;
    onSearch: (sr: string) => void;
}

const DbounceComponent = (props: DbounceComponentProps) => {
    return (
        <Fragment>
            <div className="p-2 my-3">
                <label className="block mb-2 text-sm font-medium text-gray-900">{props.label}</label>
                <input placeholder={props.placeholder} required type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
        </Fragment>
    );
}

export default DbounceComponent;