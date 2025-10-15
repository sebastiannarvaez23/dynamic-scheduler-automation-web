import { Fragment, useState } from "react";

import { cronToTime } from "../../utils/cron/timepicker-convert.util";
import PaginationComponent from "./TablePagination.component";
import TableFiltersComponent from "./TableFilters.component";

import type { Header } from "../interfaces/header.interface";
import DialogComponent from "./Dialog.component";

interface TableComponentProps {
    headers: Header[],
    data: any[],
    totalElements: number,
    filters: Record<string, any>;
    handleSetFilters: (filters: Record<string, any>) => void;
    handleGetElements: (page: number, filters?: Record<string, any>) => void;
    handlePreUpdate?: (id: string) => void;
    handleDelete?: (id: string) => void;
}

const TableComponent = (props: TableComponentProps) => {

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [dialog, setDialog] = useState<boolean>(false);
    const [idRow, setIdRow] = useState<string>("");

    const handlePreDeleteRow = (id: string) => {
        setIdRow(id);
        setDialog(true);
    }

    const emptyRows = Math.max(10 - props.data.length, 0);

    return (
        <Fragment>
            <DialogComponent
                message="¿Está seguro de eliminar este elemento?"
                open={dialog}
                setOpen={setDialog}
                confirm={() => {
                    setDialog(false);
                    props.handleDelete(idRow);
                }}
            />
            <TableFiltersComponent
                headers={props.headers}
                filters={props.filters}
                handleSetFilters={props.handleSetFilters}
                handleGetElements={props.handleGetElements}
            />
            <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] uppercase tracking-wider text-gray-400">Contenido</span>
                <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            {props.headers.map((e, index) =>
                            (<th key={index} scope="col" className="px-6 py-3">
                                {e.label}
                            </th>)
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((row, rowIndex) => (
                            <tr
                                key={row.id || rowIndex}
                                className="bg-white border-b border-gray-200 hover:bg-gray-50"
                            >
                                {props.headers.map((header, colIndex) => {
                                    if (!header.field) {
                                        if (colIndex === props.headers.length - 2) {
                                            return (
                                                <td className="px-6 py-4 text-right">
                                                    <a className="font-medium text-blue-600 hover:underline" onClick={() => props.handlePreUpdate(row.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                        </svg>
                                                    </a>
                                                </td>
                                            );
                                        }
                                        if (colIndex === props.headers.length - 1) {
                                            return (
                                                <td className="px-6 py-4 text-right">
                                                    <a href="#" className="font-medium text-blue-600 hover:underline" onClick={() => handlePreDeleteRow(row.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                    </a>
                                                </td>
                                            );
                                        }
                                        return <td key={colIndex} className="px-6 py-4"></td>;
                                    }

                                    let value = row[header.field];

                                    if (header.field === "cronExpression" && value) {
                                        value = cronToTime(value);
                                    }

                                    if (typeof value === "boolean") {
                                        value = value ? "S" : "N";
                                    }

                                    return (
                                        <td key={colIndex} className="px-6 py-4">
                                            {value ?? "-"}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}

                        {Array.from({ length: emptyRows }).map((_, idx) => (
                            <tr key={`empty-${idx}`} className="bg-white border-b border-gray-200">
                                {props.headers.map((_, colIdx) => (
                                    <td key={colIdx} className="px-6 py-4">&nbsp;</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <PaginationComponent
                currentPage={currentPage}
                totalRecords={props.totalElements}
                onPageChange={(newPage) => setCurrentPage(newPage)}
                handleGetElements={props.handleGetElements}
            />
        </Fragment>
    );
}

export default TableComponent;