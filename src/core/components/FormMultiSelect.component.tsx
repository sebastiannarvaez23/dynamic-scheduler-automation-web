import { useState, useEffect, useRef, Fragment } from "react";


export interface Option {
    id: string;
    name: string;
}

interface FormMultiselectProps {
    label: string;
    options: Option[];
    selected?: string[];
    onChange?: (values: string[]) => void;
    onSearch?: (value: string) => void;
    placeholder?: string;
    debounceDelay?: number;
    error?: boolean;
    helperText?: React.ReactNode;
    name: string;
    id?: string;
    isLoading?: boolean;
}

const FormMultiselect = ({
    label,
    options,
    selected = [],
    onChange,
    onSearch,
    placeholder = "Selecciona...",
    debounceDelay = 300,
    error = false,
    helperText,
    name,
    id,
    isLoading = false,
}: FormMultiselectProps) => {
    const inputId = id || name || "multiselect";

    const [search, setSearch] = useState("");
    const [displayedOptions, setDisplayedOptions] = useState<Option[]>(options || []);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>(selected || []);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelectedValues(selected || []);
    }, [selected]);

    useEffect(() => {
        if (!search) {
            setDisplayedOptions(options || []);
        } else {
            setDisplayedOptions((options || []).filter((opt) => opt.name.toLowerCase().includes(search.toLowerCase())));
        }
    }, [options, search]);

    useEffect(() => {
        const handler = setTimeout(() => {
            const filtered = (options || []).filter((opt) => opt.name.toLowerCase().includes(search.toLowerCase()));
            setDisplayedOptions(filtered);
            onSearch?.(search);
            console.debug("[FormMultiselect] search:", search, "displayed:", filtered.length, "options total:", (options || []).length);
        }, debounceDelay);

        return () => clearTimeout(handler);
    }, [search, options, debounceDelay, onSearch]);

    useEffect(() => {
        onChange?.(selectedValues);
    }, [selectedValues, onChange]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOption = (id: string) => {
        setSelectedValues((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
    };

    return (
        <Fragment>
            <div className="col-span-2 relative" ref={containerRef}>
                <label htmlFor={inputId} className="block mb-2 text-sm font-medium text-gray-900">
                    {label}
                </label>

                <div
                    className={`bg-gray-50 border rounded-lg p-2 flex flex-wrap gap-1 items-center cursor-text
            ${error ? "border-red-500 focus-within:ring-red-500 focus-within:border-red-500" : "border-gray-300 focus-within:ring-primary-600 focus-within:border-primary-600"}`}
                    onClick={() => {
                        setIsOpen(true);
                        const el = containerRef.current?.querySelector("input");
                        (el as HTMLInputElement | null)?.focus();
                    }}
                >
                    {selectedValues.map((idVal) => {
                        const opt = options.find((o) => o.id === idVal);
                        return (
                            <span key={idVal} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center gap-1">
                                <span className="max-w-xs truncate">{opt?.name}</span>
                                <button
                                    type="button"
                                    className="ml-1 text-xs leading-none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleOption(idVal);
                                    }}
                                    aria-label={`Remover ${opt?.name}`}
                                >
                                    ✕
                                </button>
                            </span>
                        );
                    })}

                    <input
                        id={inputId}
                        name={name}
                        type="text"
                        placeholder={placeholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                        className="flex-1 bg-transparent outline-none text-sm p-1 min-w-[120px]"
                        aria-expanded={isOpen}
                        aria-controls={`${inputId}-listbox`}
                    />
                </div>

                {isOpen && (
                    <div className="absolute z-50 w-full mt-1">
                        <ul
                            id={`${inputId}-listbox`}
                            role="listbox"
                            className="bg-white border border-gray-300 rounded shadow max-h-60 overflow-auto"
                        >
                            {isLoading && (
                                <li className="p-2 text-sm text-gray-500">Cargando...</li>
                            )}

                            {!isLoading && displayedOptions.length === 0 && (
                                <li className="p-2 text-sm text-gray-500">No se encontraron resultados</li>
                            )}

                            {!isLoading &&
                                displayedOptions.map((opt) => (
                                    <li
                                        key={opt.id}
                                        role="option"
                                        aria-selected={selectedValues.includes(opt.id)}
                                        onClick={() => toggleOption(opt.id)}
                                        className={`p-2 text-sm cursor-pointer hover:bg-gray-100 ${selectedValues.includes(opt.id) ? "bg-gray-100" : ""}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="truncate">{opt.name}</span>
                                            {selectedValues.includes(opt.id) && <span className="text-xs text-blue-600">✓</span>}
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                )}

                {error && helperText && <p className="mt-1 text-sm text-red-600">{helperText}</p>}
            </div>
        </Fragment>
    );
};

export default FormMultiselect;
