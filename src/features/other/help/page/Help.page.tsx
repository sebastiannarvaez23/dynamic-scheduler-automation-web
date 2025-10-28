import { Fragment } from "react";
import { LayoutPage } from "../../../../core/components/LayoutPage.component";
import { TitlePage } from "../../../../core/components/TitlePage.component";
import AppDocumentComponent from "../components/AppDocument.component";
import SectionDocumentComponent from "../components/SectionDocument.component";
import TaskDocumentComponent from "../components/TaskDocument.component";
import HistoryDocumentComponent from "../components/HistoryDocument.component";


const HelpPage = () => {
    return (
        <Fragment>
            <LayoutPage>
                <TitlePage title="Manual de Usuario" />
                <AppDocumentComponent />
                <SectionDocumentComponent
                    title="Módulo de Tareas"
                    content="El módulo de Tareas es el núcleo de la aplicación. Permite crear, editar, eliminar y
                    programar tareas automáticas que se ejecutan en intervalos definidos o en fechas específicas.
                    Cada tarea puede configurarse con parámetros personalizados, como empresa asociada,
                    tipo de proceso, hora de ejecución y reglas de activación. Además, el sistema admite
                    tareas habilitadas o deshabilitadas según las necesidades operativas, ofreciendo total
                    flexibilidad en la planificación.
                    Las tareas programadas son convertidas internamente a expresiones CRON, lo que
                    garantiza precisión y compatibilidad con los mecanismos del planificador interno.">
                    <TaskDocumentComponent />
                </SectionDocumentComponent>
                <SectionDocumentComponent
                    title="Módulo de Historicos"
                    content="El módulo de Historial registra todas las ejecuciones realizadas por el sistema
                    de automatización. En él, el usuario puede visualizar la fecha, hora, duración y
                    resultado de cada tarea, junto con su estado final (éxito, error o pendiente).
                    La información se actualiza en tiempo real mediante WebSockets, lo que permite
                    monitorear las tareas activas sin necesidad de recargar la página. Este módulo
                    incluye además filtros avanzados por empresa, estado, fecha de ejecución o nombre
                    de tarea, facilitando el análisis y seguimiento de los procesos automáticos.">
                    <HistoryDocumentComponent />
                </SectionDocumentComponent>
                <SectionDocumentComponent
                    title="Módulo de Empresas"
                    content="El módulo de Empresas administra la información de las compañías o clientes
                    asociados a las tareas automáticas. Desde aquí es posible registrar nuevas empresas,
                    editar datos existentes o eliminar registros.
                    Cada empresa puede estar vinculada a un conjunto de tareas, lo que permite
                    segmentar los procesos de automatización por cliente o entorno. Este módulo sirve como
                    punto de referencia para relacionar las ejecuciones y mantener un control ordenado del sistema.">
                    <div></div>
                </SectionDocumentComponent>
            </LayoutPage>
        </Fragment>
    );
}

export default HelpPage;