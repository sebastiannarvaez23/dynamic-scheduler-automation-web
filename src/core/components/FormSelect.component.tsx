import { Fragment } from "react";


interface FormSelectComponentProps {
    label: string;
    placeholder: string;
}

const FormSelectComponent = (props: FormSelectComponentProps) => {
    return (
        <Fragment>
            <div className="col-span-2">
                <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Category
                </label>
                <select
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                >
                    <option defaultValue="">Select category</option>
                    <option value="TV">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="GA">Gaming/Console</option>
                    <option value="PH">Phones</option>
                </select>
            </div>
        </Fragment>
    );
}

export default FormSelectComponent;