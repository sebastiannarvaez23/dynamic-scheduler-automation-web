import { Fragment } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import ButtonComponent from "../../../../core/components/Button.component";
import FormInputComponent from '../../../../core/components/FormInput.component';
import FormTimepickerComponent from "../../../../core/components/FormTimepicker.component";
import FormToggleComponent from "../../../../core/components/FormToggle.component";
import useTask from "../hooks/useTask.hook";

import type { Task } from "../interfaces/task.interface";
import { timeToCron, cronToTime } from '../../../../utils/cron/timepicker-convert.util';

interface FormCreateUpdateTaskProps {
    action: (data: Task) => void;
}

const FormCreateUpdateTask = (props: FormCreateUpdateTaskProps) => {

    const { taskSelected } = useTask();

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("El nombre es requerido")
            .max(100, "El nombre no puede tener más de 100 caracteres"),
        description: Yup.string()
            .required("La descripción es requerida")
            .max(100, "La descripción no puede tener más de 100 caracteres"),
        cronExpression: Yup.string()
            .required("La hora de ejecución es requerida"),
    });

    const formik = useFormik<Task>({
        initialValues: {
            id: taskSelected.id,
            name: taskSelected.name,
            description: taskSelected.description,
            cronExpression: taskSelected.cronExpression && cronToTime(taskSelected.cronExpression),
            active: taskSelected.active
        },
        validationSchema,
        onSubmit: (values) => handleSubmit(values)
    });

    const handleSubmit = async (task: Task) => {
        const taskToSend: Task = {
            ...task,
            cronExpression: timeToCron(task.cronExpression)
        };
        props.action(taskToSend);
    };

    return (
        <Fragment>
            <form className="p-4 md:p-5" onSubmit={formik.handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <FormInputComponent
                        label="Nombre"
                        placeholder="Escriba el nombre de la tarea"
                        name="name"
                        value={formik.values.name}
                        error={formik.touched.name!! && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        onChange={formik.handleChange} />
                    <FormInputComponent
                        label="Descripción"
                        placeholder="Escriba la descripción de la tarea"
                        name="description"
                        value={formik.values.description}
                        error={formik.touched.description!! && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        onChange={formik.handleChange} />
                    <div className="col-span-2 sm:col-span-1">
                        <FormTimepickerComponent
                            label="Hora de ejecución"
                            placeholder="Especifique la hora de ejecución"
                            name="cronExpression"
                            id="cronExpressionId"
                            value={formik.values.cronExpression}
                            error={formik.touched.cronExpression!! && Boolean(formik.errors.cronExpression)}
                            helperText={formik.touched.cronExpression && formik.errors.cronExpression}
                            onChange={formik.handleChange} />
                    </div>
                    <div className="col-span-2 sm:col-span-1 flex items-center mx-4">
                        <FormToggleComponent
                            label="Activo"
                            name="active"
                            value={formik.values.active}
                            onChange={formik.handleChange} />
                    </div>
                </div>
                <div className="mt-7">
                    <ButtonComponent label="+ Añadir nueva tarea" type="submit" />
                </div>
            </form>
        </Fragment>
    );
}

export default FormCreateUpdateTask;