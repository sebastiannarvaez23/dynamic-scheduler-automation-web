import { Fragment } from "react/jsx-runtime";
import ButtonComponent from "../../../../core/components/Button.component";

interface FormCreateTaskProps {

}

const FormCreateTask = (props: FormCreateTaskProps) => {
    return (
        <Fragment>
            <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Type product name"
                            required
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="$2999"
                            required
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
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
                </div>
                <ButtonComponent label="+ Add new product" action={() => { }} />
            </form>
        </Fragment>
    );
}

export default FormCreateTask;