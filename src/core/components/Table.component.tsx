import { Fragment } from "react/jsx-runtime";
import type { Header } from "../interfaces/header.interface";

interface TableComponentProps {
    headers: Header[]
}

const TableComponent = (props: TableComponentProps) => {
    return (
        <Fragment>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            {props.headers.map(e =>
                            (<th scope="col" className="px-6 py-3">
                                {e.label}
                            </th>)
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 hover:underline">Editar</a>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 hover:underline">Eliminar</a>
                            </td>
                        </tr>
                        <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Microsoft Surface Pro
                            </th>
                            <td className="px-6 py-4">
                                White
                            </td>
                            <td className="px-6 py-4">
                                Laptop PC
                            </td>
                            <td className="px-6 py-4">
                                $1999
                            </td>
                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 hover:underline">Editar</a>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 hover:underline">Eliminar</a>
                            </td>
                        </tr>
                        <tr className="bg-white hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Magic Mouse 2
                            </th>
                            <td className="px-6 py-4">
                                Black
                            </td>
                            <td className="px-6 py-4">
                                Accessories
                            </td>
                            <td className="px-6 py-4">
                                $99
                            </td>
                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 hover:underline">Editar</a>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 hover:underline">Eliminar</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default TableComponent;