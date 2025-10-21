import { Fragment } from "react";

import { LayoutPage } from '../../../../core/components/LayoutPage.component';
import { TitlePage } from "../../../../core/components/TitlePage.component";
import ButtonComponent from "../../../../core/components/Button.component";
import HistoryListener from "../listener/History.listener";
import TableComponent from "../../../../core/components/Table.component";
import type { Header } from "../../../../core/interfaces/header.interface";
import useHistory from "../hooks/useHistory.hook";


const HistoryPage = () => {

    const load = { loading: "RUNNING", complete: "COMPLETED", fail: "FAILED" };
    const headers: Header[] = [
        { label: 'Nombre tarea', field: "task.name", typeFilter: 'input', filter: true, format: 'text' },
        { label: 'Fecha ejecución', field: "executionDate", typeFilter: 'date', filter: true, format: 'date' },
        { label: 'Hora ejecución', field: "executionHour", typeFilter: undefined, filter: false, format: 'hour' },
        { label: 'Tiempo de ejecución', field: "executionTime", typeFilter: undefined, filter: false, format: 'duration' },
        { label: 'Empresa', field: "company.name", typeFilter: 'select', filter: false, format: undefined },
        { label: 'Estado', field: "status", typeFilter: 'select', filter: false, format: undefined, load: load },
    ];

    const {
        listenerRef,
        histories,
        count,
        filters,
        handleSetFilters,
        handleGetHistories,
        handleSocketData,
        handleInitialSocketData
    } = useHistory();

    return (
        <Fragment>
            <HistoryListener
                ref={listenerRef}
                onChange={handleSocketData}
                onInitialData={handleInitialSocketData} />
            <LayoutPage>
                <TitlePage title="Historial de ejecuciones" />
                <div className="w-full my-5 px-10 text-right">
                    <ButtonComponent type="button" label="Limpiar filtros" action={() => handleGetHistories(2)} />
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