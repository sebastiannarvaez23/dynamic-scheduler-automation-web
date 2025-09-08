import { Fragment } from "react";

import { LayoutPage } from "../../../../core/components/LayoutPage.component";
import { TitlePage } from "../../../../core/components/TitlePage.component";
import ButtonComponent from "../../../../core/components/Button.component";
import FormCreateUpdateTask from "../forms/CreateTask.form";
import ModalComponent from '../../../../core/components/Modal.component';
import TableComponent from "../../../../core/components/Table.component";
import useTask from "../hooks/useTask.hook";

import type { Header } from "../../../../core/interfaces/header.interface";
import type { Task } from "../interfaces/task.interface";


const TaskingPage = () => {

    const headers: Header[] = [
        { label: 'Nombre', field: "name", typeFilter: 'input', filter: true },
        { label: 'Descripción', field: "description", typeFilter: 'input', filter: true },
        { label: 'Hora ejecución', field: "cronExpression", typeFilter: 'time', filter: true },
        { label: 'Activo', field: "active", typeFilter: 'toggle', filter: true },
        { label: undefined, field: "", typeFilter: undefined, filter: true },
        { label: undefined, field: "", typeFilter: undefined, filter: true },
    ];

    const {
        tasks,
        count,
        filters,
        page,
        modalCreate,
        modalUpdate,
        isLoadingTaskSelected,
        setModalCreate,
        setModalUpdate,
        handleSetFilters,
        handleCreateTask,
        handleGetTasks,
        handleGetTask,
        handleUpdateTask,
        handleCleanFilters,
        handleSetEmptyTaskSelected,
    } = useTask();

    const handlePreUpdate = (id: string) => {
        setModalUpdate(true);
        handleGetTask(id);
    }

    const handlePreCreate = () => {
        setModalCreate(true);
        handleSetEmptyTaskSelected();
    }

    return (
        <Fragment>
            <LayoutPage>
                <TitlePage title="Tareas programadas" />
                <ModalComponent
                    title={"Crear tarea"}
                    open={modalCreate}
                    setOpen={setModalCreate}>
                    <FormCreateUpdateTask
                        action={(task: Task) => handleCreateTask(task, 0)} />
                </ModalComponent>
                <ModalComponent
                    title={"Editar tarea"}
                    open={!isLoadingTaskSelected && modalUpdate}
                    setOpen={setModalUpdate}>
                    <FormCreateUpdateTask
                        action={(task: Task) => handleUpdateTask(task, page)} />
                </ModalComponent>
                <div className="w-full my-5 px-10 text-right">
                    <ButtonComponent
                        label="Limpiar filtros"
                        type="button"
                        action={handleCleanFilters} />
                    <ButtonComponent
                        label="Crear tarea"
                        type="button"
                        action={handlePreCreate} />
                </div>
                <div>
                    <TableComponent
                        headers={headers}
                        data={tasks}
                        totalElements={count}
                        filters={filters}
                        handlePreUpdate={handlePreUpdate}
                        handleGetElements={handleGetTasks}
                        handleSetFilters={handleSetFilters} />
                </div>
            </LayoutPage>
        </Fragment>
    );
}

export default TaskingPage;