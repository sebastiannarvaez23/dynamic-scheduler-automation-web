import { Fragment } from "react/jsx-runtime";

interface TableComponentProps {

}

const TableComponent = (props: TableComponentProps) => {
    return (
        <Fragment>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-300">
                    <thead className="text-xs uppercase bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        <tr>
                            <th scope="col" className="px-6 py-3">Product name</th>
                            <th scope="col" className="px-6 py-3">Color</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            {
                                name: 'Apple MacBook Pro 17"',
                                color: 'Silver',
                                category: 'Laptop',
                                price: '$2999',
                            },
                            {
                                name: 'Microsoft Surface Pro',
                                color: 'White',
                                category: 'Laptop PC',
                                price: '$1999',
                            },
                            {
                                name: 'Magic Mouse 2',
                                color: 'Black',
                                category: 'Accessories',
                                price: '$99',
                            },
                        ].map((item, idx) => (
                            <tr
                                key={item.name}
                                className="bg-white even:bg-gray-50 border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:even:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {item.name}
                                </th>
                                <td className="px-6 py-4">{item.color}</td>
                                <td className="px-6 py-4">{item.category}</td>
                                <td className="px-6 py-4">{item.price}</td>
                                <td className="px-6 py-4 text-right">
                                    <a
                                        href="#"
                                        className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        Edit
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default TableComponent;