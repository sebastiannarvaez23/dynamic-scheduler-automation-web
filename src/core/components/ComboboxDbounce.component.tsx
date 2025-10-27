import { Fragment, useEffect, useRef, useState } from "react";

export interface Option {
    key: string;
    value: string;
}

interface ComboboxDbounceComponentProps {
    label: string;
    placeholder: string;
    search: string;
    options?: Option[];
    onSearch: (sr: string) => void;
    onSelect?: (option: Option) => void;
    delay?: number;
    disabled?: boolean;
}

const ComboboxDbounceComponent = ({
    label,
    placeholder,
    search,
    options = [],
    onSearch,
    onSelect,
    delay = 500,
    disabled = false,
}: ComboboxDbounceComponentProps) => {

    const [inputValue, setInputValue] = useState(search);
    const [showOptions, setShowOptions] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setInputValue(search);
    }, [search]);

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            onSearch(inputValue);
        }, delay);
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [inputValue]);

    useEffect(() => {
        if (options.length > 0 && inputValue) {
            const lower = inputValue.toLowerCase();
            setFilteredOptions(
                options.filter(opt => opt.value.toLowerCase().includes(lower))
            );
        } else {
            setFilteredOptions(options);
        }
    }, [options, inputValue]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowOptions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (opt: Option) => {
        setInputValue(opt.value);
        setShowOptions(false);
        onSelect?.(opt);
    };

    return (
        <Fragment>
            <div ref={containerRef} className="p-2 my-3">
                <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
                <div className="relative">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setShowOptions(true);
                        }}
                        onFocus={() => setShowOptions(true)}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-8
                            appearance-none ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    />
                    <div
                        className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-2 text-gray-500"
                    >
                        <svg
                            className={`w-4 h-4 transform transition-transform ${showOptions ? "rotate-180" : ""
                                }`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    {showOptions && (
                        <ul
                            className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg 
                                       max-h-48 overflow-y-auto text-sm"
                        >
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((opt) => (
                                    <li
                                        key={opt.key}
                                        onClick={() => handleSelect(opt)}
                                        className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-gray-800"
                                    >
                                        {opt.value}
                                    </li>
                                ))
                            ) : (
                                <li className="px-3 py-2 text-gray-400">Sin resultados</li>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ComboboxDbounceComponent;
