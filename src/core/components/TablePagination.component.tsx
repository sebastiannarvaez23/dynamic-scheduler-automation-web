import { Fragment, useEffect } from "react";

interface PaginationProps {
    currentPage: number;
    totalRecords: number;
    onPageChange: (page: number) => void;
    handleGetElements: (page: number, filter?: string) => void;
}

const PaginationComponent = ({
    currentPage,
    totalRecords,
    onPageChange,
    handleGetElements
}: PaginationProps) => {

    const totalPages: number = Math.ceil(totalRecords / 10);

    const goToFirst = () => onPageChange(0);
    const goToPrevious = () => onPageChange(Math.max(currentPage - 1, 0));
    const goToNext = () => onPageChange(Math.min(currentPage + 1, totalPages - 1));
    const goToLast = () => onPageChange(totalPages - 1);

    const changePage = (newPage: number) => {
        if (newPage >= 0 && newPage <= totalPages) {
            handleGetElements(newPage);
        }
    }

    useEffect(() => {
        changePage(currentPage);
    }, [currentPage]);

    return (
        <Fragment>
            <div className="flex items-center justify-center space-x-3 mt-4 text-sm text-gray-700">
                <span className="font-medium">{totalRecords} registros</span>

                <button
                    onClick={goToFirst}
                    disabled={currentPage === 0}
                    className="bg-white cursor-pointer px-2 py-1 rounded hover:shadow-xl disabled:text-gray-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                    </svg>
                </button>
                <button
                    onClick={goToPrevious}
                    disabled={currentPage === 0}
                    className="bg-white cursor-pointer px-2 py-1 rounded hover:shadow-xl disabled:text-gray-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <span className="font-semibold">
                    pág {currentPage + 1} de {totalPages}
                </span>

                <button
                    onClick={goToNext}
                    disabled={currentPage === totalPages - 1}
                    className="bg-white cursor-pointer px-2 py-1 rounded hover:shadow-xl disabled:text-gray-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
                <button
                    onClick={goToLast}
                    disabled={currentPage === totalPages - 1}
                    className="bg-white cursor-pointer px-2 py-1 rounded hover:shadow-xl disabled:text-gray-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </Fragment>
    );
};

export default PaginationComponent;