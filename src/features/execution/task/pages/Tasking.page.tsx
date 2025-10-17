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
        { label: 'Código', field: "code", typeFilter: 'input', filter: true, format: 'text' },
        { label: 'Nombre', field: "name", typeFilter: 'input', filter: true, format: 'text' },
        { label: 'Descripción', field: "description", typeFilter: 'input', filter: true, format: 'text' },
        { label: 'Hora ejecución', field: "cronExpression", typeFilter: 'time', filter: true, format: 'hour' },
        { label: 'Activo', field: "active", typeFilter: 'toggle', filter: true, format: 'text' },
        { label: undefined, field: "", typeFilter: undefined, filter: false, format: undefined },
        { label: undefined, field: "", typeFilter: undefined, filter: false, format: undefined },
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
        handleDeleteTask,
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
                        label="+ Añadir nueva tarea"
                        action={(task: Task) => handleCreateTask(task, 0)} />
                </ModalComponent>
                <ModalComponent
                    title={"Editar tarea"}
                    open={!isLoadingTaskSelected && modalUpdate}
                    setOpen={setModalUpdate}>
                    <FormCreateUpdateTask
                        label="Editar tarea"
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
                        handleSetFilters={handleSetFilters}
                        handleDelete={handleDeleteTask} />
                </div>
            </LayoutPage>
        </Fragment>
    );
}

export default TaskingPage;