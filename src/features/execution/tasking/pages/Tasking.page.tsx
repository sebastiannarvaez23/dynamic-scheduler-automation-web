import { Fragment } from "react/jsx-runtime";
import { LayoutPage } from "../../../../core/components/LayoutPage.component";
import { TitlePage } from "../../../../core/components/TitlePage.component";
import ButtonComponent from "../../../../core/components/Button.component";
import TableComponent from "../../../../core/components/Table.component";
import type { Header } from "../../../../core/interfaces/header.interface";

const TaskingPage = () => {

    const headers: Header[] = [
        { label: 'Nombre' },
        { label: 'Descripción' },
        { label: 'Hora ejecución' },
        { label: 'Activo' },
        { label: '' },
        { label: '' },
    ]

    return (
        <Fragment>
            <LayoutPage>
                <TitlePage title="Tareas programadas" />
                <div className="w-full my-5 px-10 text-right">
                    <ButtonComponent label="Crear tarea" action={() => alert("Presionaste en crear tarea")} />
                </div>
                <div>
                    <TableComponent headers={headers} />
                </div>
            </LayoutPage>
        </Fragment>
    );
}

export default TaskingPage;