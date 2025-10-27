import { Fragment, useEffect } from "react";

import { timeToCron } from "../../utils/cron/timepicker-convert.util";
import DatepickerComponent from "./Datepicker.component";
import DbounceComponent from "./Dbounce.component";
import SelectComponent from "./Select.componet";
import TimepickerComponent from "./Timepicker.component";
import ToggleComponent from "./Toggle.component";

import type { Header } from "../interfaces/header.interface";
import ComboboxDbounceComponent from "./ComboboxDbounce.component";


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
        const filterData: Record<string, any> = { ...filters };
        if (filterData.cronExpression) filterData.cronExpression = timeToCron(filterData.cronExpression);
        handleGetElements(0, filterData);

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
                                    <SelectComponent
                                        label={header.label}
                                        options={header.options}
                                        selected={
                                            typeof filters[key] === "object"
                                                ? filters[key]
                                                : header.options?.find(o => o.key === filters[key])
                                        }
                                        onSelect={(val) => {
                                            const option = header.options?.find(o => o.key === val);
                                            handleChange(key, option?.key);
                                        }}
                                    />
                                </div>
                            );

                        case "combobox":
                            return (
                                <div key={key} className="flex flex-col w-full sm:w-[220px]">
                                    <ComboboxDbounceComponent
                                        label={header.label}
                                        placeholder={`Buscar ${header.label.toLowerCase()}...`}
                                        search={
                                            typeof filters[key] === "object"
                                                ? filters[key]?.value || ""
                                                : filters[key] || ""
                                        }
                                        options={header.options}
                                        onSearch={(val) => {
                                            header.extra?.handleGetCompanys?.(0, { name: val });
                                        }}
                                        onSelect={(opt) => {
                                            handleChange(key, opt.value);
                                        }}
                                    />
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
                                    <DatepickerComponent
                                        label={header.label}
                                        search={filters[key] || ""}
                                        onSearch={(val) => handleChange(key, val)}
                                    />
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
