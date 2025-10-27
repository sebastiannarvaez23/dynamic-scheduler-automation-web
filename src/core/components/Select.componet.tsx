import { Fragment } from "react";


export interface Option {
    key: string;
    value: string;
}

interface SelectComponentProps {
    label: string;
    options?: Option[];
    selected?: Option;
    onSelect: (id: string) => void;
}

const SelectComponent = ({ label, options, selected, onSelect }: SelectComponentProps) => {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(event.target.value);
    };

    return (
        <Fragment>
            <div className="p-2 my-3">
                <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
                <div className="relative">
                    <select
                        id={label.toLowerCase().replace(/\s/g, "-")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-8
              appearance-none"
                        value={selected?.key ?? ""}
                        onChange={handleSelect}
                    >
                        <option value="">
                            {`Seleccione ${label.length > 15
                                ? label.toLowerCase().slice(0, 15) + "..."
                                : label.toLowerCase()
                                }`}
                        </option>
                        {options?.map((e) => (
                            <option key={e.key} value={e.key}>
                                {e.value}
                            </option>
                        ))}
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-2 text-gray-500">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SelectComponent;
