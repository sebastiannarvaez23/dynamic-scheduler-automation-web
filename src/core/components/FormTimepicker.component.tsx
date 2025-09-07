import { Fragment } from "react/jsx-runtime";

interface FormTimeComponentProps {
    label: string;
    placeholder?: string;
    required?: boolean;
    name?: string;
    id?: string;
    value: string;
    error?: boolean;
    helperText?: React.ReactNode;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormTimepickerComponent = (props: FormTimeComponentProps) => {
    const inputId = props.id || props.name || "time";

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
                    type="time"
                    name={props.name || "time"}
                    id={inputId}
                    value={props.value}
                    onChange={props.onChange}
                    className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5
                    ${props.error
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-primary-600 focus:border-primary-600"
                        }`}
                    placeholder={props.placeholder}
                    required={props.required}
                />
                {props.error && props.helperText && (
                    <p className="mt-1 text-sm text-red-600">{props.helperText}</p>
                )}
            </div>
        </Fragment>
    );
};

export default FormTimepickerComponent;
