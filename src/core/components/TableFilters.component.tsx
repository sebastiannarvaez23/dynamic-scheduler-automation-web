import { Fragment, useEffect, useState } from "react";
import DbounceComponent from "./Dbounce.component";
import type { Header } from "../interfaces/header.interface";
import ToggleComponent from "./Toggle.component";
import TimeComponent from "./Time.component";

interface TableFiltersComponentProps {
    headers: Header[];
    onFiltersChange?: (filters: Record<string, any>) => void;
}

const TableFiltersComponent = ({ headers, onFiltersChange }: TableFiltersComponentProps) => {
    const [filters, setFilters] = useState<Record<string, any>>({});

    const handleChange = (key: string, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        onFiltersChange?.(filters);
    }, [filters]);

    return (
        <Fragment>
            <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-gray-400">Filtros</span>
                <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="flex flex-wrap gap-4 p-4">
                {headers.map((header) => {
                    if (!header.label) return null;

                    const key = header.label;

                    switch (header.typeFilter) {
                        case "input":
                            return (
                                <DbounceComponent
                                    key={key}
                                    label={header.label}
                                    placeholder={`Buscar ${header.label}`}
                                    search={filters[key] || ""}
                                    onSearch={(val) => handleChange(key, val)}
                                />
                            );

                        case "toggle":
                            return (
                                <div key={key} className="flex items-center gap-2">
                                    <ToggleComponent label={header.label} />
                                </div>
                            );

                        case "select":
                            return (
                                <div key={key} className="flex flex-col">
                                    <label htmlFor={key} className="text-sm text-gray-700">{header.label}</label>
                                    <select
                                        id={key}
                                        value={filters[key] || ""}
                                        onChange={(e) => handleChange(key, e.target.value)}
                                        className="text-sm border border-gray-300 rounded p-1"
                                    >
                                        <option value="">Todos</option>
                                        <option value="option1">Opción 1</option>
                                        <option value="option2">Opción 2</option>
                                    </select>
                                </div>
                            );

                        case "time":
                            return (
                                <div key={key} className="flex flex-col">
                                    <TimeComponent label={header.label} />
                                </div>
                            );

                        default:
                            return null;
                    }
                })}
            </div>
        </Fragment>
    );
};

export default TableFiltersComponent;
