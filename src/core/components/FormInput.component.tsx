import { Fragment } from "react";


interface FormInputComponentProps {
    label: string;
    placeholder: string;
    value: string;
    error: boolean;
    helperText: React.ReactNode;
    name: string;
    id?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInputComponent = (props: FormInputComponentProps) => {
    const inputId = props.id || props.name || "input";

    return (
        <Fragment>
            <div className="col-span-2">
                <label
                    htmlFor={inputId}
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    {props.label}
                </label>
                <input
                    type="text"
                    name={props.name || "name"}
                    id={inputId}
                    value={props.value}
                    onChange={props.onChange}
                    className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5
            ${props.error
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-primary-600 focus:border-primary-600"
                        }`}
                    placeholder={props.placeholder}
                />
                {props.error && props.helperText && (
                    <p className="mt-1 text-sm text-red-600">{props.helperText}</p>
                )}
            </div>
        </Fragment>
    );
};

export default FormInputComponent;