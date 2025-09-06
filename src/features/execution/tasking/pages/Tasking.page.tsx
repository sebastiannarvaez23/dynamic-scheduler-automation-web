import { useEffect } from "react";
import { Fragment } from "react/jsx-runtime";

import { LayoutPage } from "../../../../core/components/LayoutPage.component";
import { TitlePage } from "../../../../core/components/TitlePage.component";
import ButtonComponent from "../../../../core/components/Button.component";
import TableComponent from "../../../../core/components/Table.component";
import useTask from "../hooks/useTask.hook";

import type { Header } from "../../../../core/interfaces/header.interface";


const TaskingPage = () => {

    const headers: Header[] = [
        { label: 'Nombre', field: "name", typeFilter: 'input', filter: true },
        { label: 'Descripción', field: "description", typeFilter: 'input', filter: true },
        { label: 'Hora ejecución', field: "cronExpression", typeFilter: 'time', filter: true },
        { label: 'Activo', field: "active", typeFilter: 'toggle', filter: true },
        { label: undefined, field: undefined, typeFilter: undefined, filter: true },
        { label: undefined, field: undefined, typeFilter: undefined, filter: true },
    ]

    const { tasks, count } = useTask();

    return (
        <Fragment>
            <LayoutPage>
                <TitlePage title="Tareas programadas" />
                <div className="w-full my-5 px-10 text-right">
                    <ButtonComponent label="Limpiar filtros" action={() => alert("Presionaste en limpiar filtros")} />
                    <ButtonComponent label="Crear tarea" action={() => alert("Presionaste en crear tarea")} />
                </div>
                <div>
                    <TableComponent headers={headers} data={tasks} totalElements={count} />
                </div>
            </LayoutPage>
        </Fragment>
    );
}

export default TaskingPage;