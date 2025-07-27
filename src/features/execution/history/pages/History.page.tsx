import { Fragment } from "react/jsx-runtime";

import { LayoutPage } from '../../../../core/components/LayoutPage.component';
import { TitlePage } from "../../../../core/components/TitlePage.component";
import ButtonComponent from "../../../../core/components/Button.component";
import TableComponent from "../../../../core/components/Table.component";
import type { Header } from "../../../../core/interfaces/header.interface";

const HistoryPage = () => {

    const headers: Header[] = [
        { label: 'Nombre tarea', typeFilter: 'input', filter: true },
        { label: 'Fecha ejecución', typeFilter: 'date', filter: true },
        { label: 'Tiempo de ejecución', typeFilter: null, filter: false },
        { label: 'Estado', typeFilter: 'select', filter: true },
        { label: 'Hora ejecución', typeFilter: null, filter: false },
        { label: '', typeFilter: null, filter: false },
        { label: '', typeFilter: null, filter: false },
    ]

    return (
        <Fragment>
            <LayoutPage>
                <TitlePage title="Historial de ejecuciones" />
                <div className="w-full my-5 px-10 text-right">
                    <ButtonComponent label="Limpiar filtros" action={() => alert("Presionaste en limpiar filtros")} />
                    <ButtonComponent label="Crear tarea" action={() => alert("Presionaste en crear tarea")} />
                </div>
                <div>
                    <TableComponent headers={headers} />
                </div>
            </LayoutPage>
        </Fragment>
    );
}

export default HistoryPage;