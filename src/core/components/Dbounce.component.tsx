import { Fragment, useEffect, useState } from "react";

interface DbounceComponentProps {
    search: string;
    placeholder: string;
    label: string;
    onSearch: (sr: string) => void;
    delay?: number;
}

const DbounceComponent = ({ search, placeholder, label, onSearch, delay = 500 }: DbounceComponentProps) => {
    const [value, setValue] = useState(search);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (value !== search) {
                onSearch(value);
            }
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    useEffect(() => {
        setValue(search);
    }, [search]);

    return (
        <Fragment>
            <div className="p-2 my-3">
                <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
                <input
                    placeholder={placeholder}
                    required
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
        </Fragment>
    );
};

export default DbounceComponent;
