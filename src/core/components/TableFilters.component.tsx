import { Fragment, useEffect } from "react";

import { timeToCron } from "../../utils/cron/timepicker-convert.util";
import DatepickerComponent from "./Datepicker.component";
import DbounceComponent from "./Dbounce.component";
import SelectComponent from "./Select.componet";
import TimepickerComponent from "./Timepicker.component";
import ToggleComponent from "./Toggle.component";

import type { Header } from "../interfaces/header.interface";


interface TableFiltersComponentProps {
    headers: Header[];
    filters: Record<string, any>;
    onFiltersChange?: (filters: Record<string, any>) => void;
    handleGetElements: (page: number, filters: Record<string, any>) => void;
    handleSetFilters: (filters: Record<string, any>) => void;
}

const TableFiltersComponent = ({ headers, filters, onFiltersChange, handleGetElements, handleSetFilters }: TableFiltersComponentProps) => {

    const handleChange = (key: string, value: any) => {
        handleSetFilters({ ...filters, [key]: value });
    };

    useEffect(() => {
        onFiltersChange?.(filters);
        const { cronExpression, ...rest } = filters;
        handleGetElements(0, {
            cronExpression: cronExpression ? timeToCron(cronExpression) : undefined,
            ...rest,
        });
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

                    const key = header.field;

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
                                    <ToggleComponent
                                        label={header.label}
                                        value={filters[key] || ""}
                                        onChange={(val) => handleChange(key, val)}
                                    />
                                </div>
                            );

                        case "select":
                            return (
                                <div key={key} className="flex flex-col w-full sm:w-[220px]">
                                    <SelectComponent label={header.label} />
                                </div>
                            );

                        case "time":
                            return (
                                <div key={key} className="flex flex-col">
                                    <TimepickerComponent
                                        label={header.label}
                                        search={filters[key] || ""}
                                        onSearch={(val) => handleChange(key, val)}
                                    />
                                </div>
                            );

                        case "date":
                            return (
                                <div key={key} className="flex flex-col">
                                    <DatepickerComponent label={header.label} />
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
