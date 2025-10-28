import { Fragment } from "react";

import ImageComponent from "../../../../core/components/Image.component";
import RunningTask from "../../../../assets/gif/runnig-task.gif";


const HistoryDocumentComponent = () => {
    return (
        <Fragment>
            <div>
                <h2 className="text-xl">Ejecuciones de tareas</h2>
            </div>
            <br />
            <p>
                En esta pantalla se visualizan en tiempo real las ejecuciones de las tareas automáticas
                configuradas en el sistema. La tabla muestra información como el nombre de la tarea, empresa,
                fecha y hora de ejecución, estado y detalle del resultado.
                Los datos se actualizan automáticamente mediante WebSockets, permitiendo monitorear el
                progreso sin recargar la página. Además, cuenta con filtros dinámicos que facilitan la
                búsqueda por fecha, estado o empresa, ofreciendo una visión clara y actualizada del
                funcionamiento de las tareas programadas.
            </p>
            <ImageComponent m={RunningTask} />
        </Fragment>
    );
}

export default HistoryDocumentComponent;