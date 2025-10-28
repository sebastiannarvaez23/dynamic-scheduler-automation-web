import { Fragment } from "react";


const AppDocumentComponent = () => {
    return (
        <Fragment>
            <div className="mx-10">
                <br />
                <p>
                    La aplicación de tareas automáticas permite gestionar, programar y monitorear la
                    ejecución de procesos de forma centralizada y en tiempo real. Su diseño está orientado
                    a la automatización de operaciones repetitivas, brindando al usuario una interfaz intuitiva
                    para crear, editar y controlar tareas asociadas a diferentes empresas o entornos.
                    El sistema cuenta con un módulo de historiales que muestra el estado, la fecha y la duración
                    de cada ejecución, integrando filtros dinámicos y actualizaciones en vivo mediante WebSockets.
                    Gracias a su arquitectura distribuida, la aplicación garantiza escalabilidad, trazabilidad y
                    alta disponibilidad, facilitando la supervisión eficiente de los procesos automáticos dentro
                    de la organización.
                </p>
            </div>

        </Fragment>
    );
}

export default AppDocumentComponent;