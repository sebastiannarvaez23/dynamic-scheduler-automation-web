import { Fragment } from "react/jsx-runtime";

import { LayoutPage } from '../../../../core/components/LayoutPage.component';
import { TitlePage } from "../../../../core/components/TitlePage.component";
import ButtonComponent from "../../../../core/components/Button.component";
import TableComponent from "../../../../core/components/Table.component";
import type { Header } from "../../../../core/interfaces/header.interface";
import useHistory from "../hooks/useHistory.hook";

const HistoryPage = () => {

    const headers: Header[] = [
        { label: 'Nombre tarea', field: "task.name", typeFilter: 'input', filter: true },
        { label: 'Fecha ejecución', field: "executionDate", typeFilter: 'date', filter: true },
        { label: 'Tiempo de ejecución', field: "executionTime", typeFilter: undefined, filter: false },
        { label: 'Estado', field: "status", typeFilter: 'select', filter: false },
        { label: 'Hora ejecución', field: "executionHour", typeFilter: undefined, filter: false },
    ];

    const {
        histories,
        count,
        filters,
        page,
        modalCreate,
        modalUpdate,
        isLoadingHistorySelected,
        setModalCreate,
        setModalUpdate,
        handleSetFilters,
        handleCreateHistory,
        handleGetHistories,
        handleGetHistory,
        handleUpdateHistory,
        handleCleanFilters,
        handleSetEmptyHistorySelected,
        handleDeleteHistory,
    } = useHistory();

    return (
        <Fragment>
            <LayoutPage>
                <TitlePage title="Historial de ejecuciones" />
                <div className="w-full my-5 px-10 text-right">
                    <ButtonComponent type="button" label="Limpiar filtros" action={() => alert("Presionaste en limpiar filtros")} />
                </div>
                <div>
                    <TableComponent
                        headers={headers}
                        data={histories}
                        totalElements={count}
                        filters={filters}
                        handleGetElements={handleGetHistories}
                        handleSetFilters={handleSetFilters} />
                </div>
            </LayoutPage>
        </Fragment>
    );
}

export default HistoryPage;