import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatepickerComponentProps {
    label: string;
    search?: string;
    onSearch: (sr: string) => void;
}

const DatepickerComponent = ({ label, search, onSearch }: DatepickerComponentProps) => {
    const [startDate, setStartDate] = useState<Date | null>(null);

    useEffect(() => {
        if (search) {
            let localDate: Date | null = null;

            if (search.includes("/")) {
                const [day, month, year] = search.split("/");
                localDate = new Date(Number(year), Number(month) - 1, Number(day));
            } else if (search.includes("-")) {
                const [year, month, day] = search.split("-");
                localDate = new Date(Number(year), Number(month) - 1, Number(day));
            }

            if (!isNaN(localDate!.getTime())) {
                setStartDate(localDate);
            } else {
                console.warn("⚠️ Fecha inválida recibida:", search);
                setStartDate(null);
            }
        } else {
            setStartDate(null);
        }
    }, [search]);

    const handleChange = (date: Date | null) => {
        setStartDate(date);
        if (date) {
            // Formato local yyyy-MM-dd (sin convertir a UTC)
            const formatted = date.toLocaleDateString("en-CA");
            onSearch(formatted);
        } else {
            onSearch("");
        }
    };

    return (
        <div className="p-2 my-3">
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <div className="relative w-full max-w-xs">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        className="w-5 h-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>
                <DatePicker
                    selected={startDate}
                    onChange={handleChange}
                    placeholderText="Selecciona una fecha"
                    className="pl-10 pr-4 py-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    dateFormat="dd/MM/yyyy"
                    isClearable
                />
            </div>
        </div>
    );
};

export default DatepickerComponent;
