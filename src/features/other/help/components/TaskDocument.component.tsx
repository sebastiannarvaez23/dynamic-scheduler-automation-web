import { Fragment } from "react";

import CreateTask from "../../../../assets/gif/create-task.gif";
import EditTask from "../../../../assets/gif/edit-task.gif";
import DeleteTask from "../../../../assets/gif/delete-task.gif";
import ImageComponent from '../../../../core/components/Image.component';


const TaskDocumentComponent = () => {
    return (
        <Fragment>
            <div>
                <h2 className="text-xl">Creación de tarea</h2>
            </div>
            <br />
            <p>
                Para crear una tarea basta con darle click al boton crear y esta desplegará un modal
                con un formulario para que se ingrese la información necesaria para la ejecución de la tarea.
                Esta función solo se permitirá en desarrollo, pues al ser esto un laboratorio no se sincroniza la
                tarea creada con la clase correspondiente a su ejecución en el backend.
            </p>
            <ImageComponent m={CreateTask} />
            <div>
                <h2 className="text-xl">Edición de tarea</h2>
            </div>
            <br />
            <p>
                Para Editar una tarea basta con darle click al lapiz sobre el registro que se requiera editar, este
                desplegará un modal con un formulario para que se ingrese la información necesaria para la ejecución
                de la tarea.
            </p>
            <ImageComponent m={EditTask} />
            <div>
                <h2 className="text-xl">Eliminación de tarea</h2>
            </div>
            <br />
            <p>
                Para Eliminar una tarea basta con darle click al lapiz sobre el registro que se requiera editar, este
                desplegará un modal con un formulario para que se ingrese la información necesaria para la ejecución
                de la tarea. Esta función solo se permitirá en desarrollo, pues al ser esto un laboratorio no se
                sincroniza la tarea creada con la clase correspondiente a su ejecución en el backend.
            </p>
            <ImageComponent m={DeleteTask} />
        </Fragment>
    );
}

export default TaskDocumentComponent;