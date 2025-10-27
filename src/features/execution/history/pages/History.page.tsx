import { Fragment } from "react";

import { LayoutPage } from '../../../../core/components/LayoutPage.component';
import { TitlePage } from "../../../../core/components/TitlePage.component";
import ButtonComponent from "../../../../core/components/Button.component";
import HistoryListener from "../listener/History.listener";
import TableComponent from "../../../../core/components/Table.component";
import type { Header } from "../../../../core/interfaces/header.interface";
import type { Option as OptionCombobox } from "../../../../core/components/ComboboxDbounce.component";
import type { Option as OptionSelect } from "../../../../core/components/Select.componet";
import useCompany from "../../company/hooks/useCompany.hook";
import useHistory from "../hooks/useHistory.hook";


const HistoryPage = () => {

    const {
        listenerRef, histories, count, filters,
        handleSetFilters, handleGetHistories, handleSocketChange, handleInitialSocketData, handleCleanFilters
    } = useHistory();

    const { companies, handleGetCompanys } = useCompany();

    const load = { loading: "RUNNING", complete: "COMPLETED", fail: "FAILED" };
    const optionsStatus: OptionSelect[] = [
        { key: "RUNNING", value: "Ejecutando" },
        { key: "COMPLETED", value: "Completado" },
        { key: "FAILED", value: "Fallido" },
    ]
    const optionsCompanies: OptionCombobox[] = companies.map(e => ({ key: e.id!, value: e.name }));
    const headers: Header[] = [
        { label: 'Nombre tarea', field: "task.name", typeFilter: 'input', filter: true, format: 'text' },
        { label: 'Fecha ejecución', field: "executionDate", typeFilter: 'date', filter: true, format: 'date' },
        { label: 'Hora ejecución', field: "executionHour", typeFilter: undefined, filter: false, format: 'hour' },
        { label: 'Tiempo de ejecución', field: "executionTime", typeFilter: undefined, filter: false, format: 'duration' },
        { label: 'Empresa', field: "company.name", typeFilter: 'combobox', filter: true, format: 'text', options: optionsCompanies, extra: { handleGetCompanys } },
        { label: 'Estado', field: "status", typeFilter: 'select', filter: false, format: undefined, options: optionsStatus, load: load },
    ];

    return (
        <Fragment>
            <HistoryListener
                onInitialData={(data, total, page) => {
                    handleInitialSocketData(data, total, page);
                }}
                onChange={(changeData) => {
                    handleSocketChange(changeData);
                }}
                ref={listenerRef}
            />
            <LayoutPage>
                <TitlePage title="Historial de ejecuciones" />
                <div className="w-full my-5 px-10 text-right">
                    <ButtonComponent
                        type="button"
                        label="Limpiar filtros"
                        action={() => handleCleanFilters()}
                    />
                </div>
                <div>
                    <TableComponent
                        headers={headers}
                        data={histories}
                        totalElements={count}
                        filters={filters}
                        handleGetElements={handleGetHistories}
                        handleSetFilters={handleSetFilters}
                    />
                </div>
            </LayoutPage>
        </Fragment>
    );
}

export default HistoryPage;