import { Fragment } from "react";


interface TimeComponentProps {
    label: string;
    search: string;
    onSearch: (sr: string) => void;
}

const TimepickerComponent = (props: TimeComponentProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onSearch(event.target.value);
    };

    return (
        <Fragment>
            <div className="p-2 my-3">
                <label
                    htmlFor={props.label}
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    {props.label}
                </label>
                <input
                    id={props.label}
                    type="time"
                    value={props.search}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                               focus:ring-blue-500 focus:border-blue-500 
                               block w-full p-2.5"
                />
            </div>
        </Fragment>
    );
};

export default TimepickerComponent;
