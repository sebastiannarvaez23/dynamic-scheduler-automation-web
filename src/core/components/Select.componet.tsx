import { Fragment } from "react/jsx-runtime";

interface SelectComponentProps {
    label: string;
}

const SelectComponent = (props: SelectComponentProps) => {
    return (
        <Fragment>
            <div className="p-2 my-3 min-w-50 mx-auto max-w-sm">
                <label className="block mb-2 text-sm font-medium text-gray-900">{props.label}</label>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option selected>Seleccione</option>
                    <option value="E">Ejecutandose</option>
                    <option value="F">Terminado</option>
                </select>
            </div>
        </Fragment>
    );
}

export default SelectComponent;