import { Fragment } from "react/jsx-runtime";
import { LayoutPage } from "../../../../core/components/LayoutPage.component";
import { TitlePage } from "../../../../core/components/TitlePage.component";
import ButtonComponent from "../../../../core/components/Button.component";
import TableComponent from "../../../../core/components/Table.component";

const TaskingPage = () => {
    return (
        <Fragment>
            <LayoutPage>
                <TitlePage title="Tareas programadas" />
                <div className="w-full my-5 px-10 text-right">
                    <ButtonComponent label="Crear tarea" action={() => alert("Presionaste en crear tarea")} />
                </div>
                <div>
                    <TableComponent />
                </div>
            </LayoutPage>
        </Fragment>
    );
}

export default TaskingPage;