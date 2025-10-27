import { Fragment } from "react";


interface FormTextareaComponentProps {
    label: string;
    placeholder: string;
}

const FormTextareaComponent = (props: FormTextareaComponentProps) => {
    return (
        <Fragment>
            <div className="col-span-2">
                <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Product Description
                </label>
                <textarea
                    id="description"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write product description here"
                ></textarea>
            </div>
        </Fragment>
    );
}

export default FormTextareaComponent;