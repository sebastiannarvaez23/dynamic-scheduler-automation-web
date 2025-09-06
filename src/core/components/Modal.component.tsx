import { Fragment } from "react";


interface ModalComponentProps {
    title: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    children: React.ReactNode,
}

const ModalComponent = (props: ModalComponentProps) => {
    if (!props.open) return null;
    return (
        <Fragment>
            <div
                id="crud-modal"
                tabIndex={-1}
                aria-hidden={!props.open}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                onClick={() => props.setOpen(false)}
            >
                <div
                    className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow-sm"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {props.title}
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-900"
                            onClick={() => props.setOpen(false)}
                        >✖</button>
                    </div>
                    {/* Modal body */}
                    {props.children}
                </div>
            </div>
        </Fragment>
    );
};

export default ModalComponent;
