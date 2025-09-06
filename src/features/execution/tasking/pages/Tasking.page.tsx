import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

import { LayoutPage } from "../../../../core/components/LayoutPage.component";
import { TitlePage } from "../../../../core/components/TitlePage.component";
import ButtonComponent from "../../../../core/components/Button.component";
import ModalComponent from '../../../../core/components/Modal.component';
import TableComponent from "../../../../core/components/Table.component";
import useTask from "../hooks/useTask.hook";

import type { Header } from "../../../../core/interfaces/header.interface";
import FormCreateTask from "../components/FormCreateTask.component";


const TaskingPage = () => {

    const [modalCreate, setModalCreate] = useState<boolean>(false);

    const headers: Header[] = [
        { label: 'Nombre', field: "name", typeFilter: 'input', filter: true },
        { label: 'Descripción', field: "description", typeFilter: 'input', filter: true },
        { label: 'Hora ejecución', field: "cronExpression", typeFilter: 'time', filter: true },
        { label: 'Activo', field: "active", typeFilter: 'toggle', filter: true },
        { label: undefined, field: undefined, typeFilter: undefined, filter: true },
        { label: undefined, field: undefined, typeFilter: undefined, filter: true },
    ];

    const { tasks, count } = useTask();

    return (
        <Fragment>
            <LayoutPage>
                <TitlePage title="Tareas programadas" />
                <ModalComponent
                    title={"Crear tarea"}
                    open={modalCreate}
                    setOpen={setModalCreate}>
                    <FormCreateTask />
                </ModalComponent>
                <div className="w-full my-5 px-10 text-right">
                    <ButtonComponent label="Limpiar filtros" action={() => setModalCreate(true)} />
                    <ButtonComponent label="Crear tarea" action={() => setModalCreate(true)} />
                </div>
                <div>
                    <TableComponent headers={headers} data={tasks} totalElements={count} />
                </div>
            </LayoutPage>
        </Fragment>
    );
}

export default TaskingPage;