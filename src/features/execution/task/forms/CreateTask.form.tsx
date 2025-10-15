import { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import ButtonComponent from "../../../../core/components/Button.component";
import FormInputComponent from '../../../../core/components/FormInput.component';
import FormTimepickerComponent from "../../../../core/components/FormTimepicker.component";
import FormToggleComponent from "../../../../core/components/FormToggle.component";
import FormMultiselect, { type Option } from "../../../../core/components/FormMultiSelect.component";

import useTask from "../hooks/useTask.hook";
import useCompany from "../../company/hooks/useCompany.hook";
import type { Task } from "../interfaces/task.interface";
import { timeToCron, cronToTime } from '../../../../utils/cron/timepicker-convert.util';

interface FormCreateUpdateTaskProps {
    label: string;
    action: (data: Task) => void;
}

const FormCreateUpdateTask = ({ label, action }: FormCreateUpdateTaskProps) => {

    const { taskSelected } = useTask();
    const { companies, handleGetCompanys, isLoadingCompanies } = useCompany();

    const [search, setSearch] = useState("");

    const companyOptions: Option[] = (companies || []).map((c) => ({ id: String(c.id), name: c.name }));

    /** 
     * TODO: La logica del Dbounce se debe abstraer dentro del componente FormMultiselect
     * */
    useEffect(() => {
        const handler = setTimeout(() => {
            handleGetCompanys(0, { search });
        }, 300);
        return () => clearTimeout(handler);
    }, [search, handleGetCompanys]);

    const validationSchema = Yup.object({
        code: Yup.string()
            .required("El código es requerido")
            .max(5, "El código no puede tener más de 5 caracteres")
            .min(5, "El código no puede tener menos de 5 caracteres"),
        name: Yup.string()
            .required("El nombre es requerido")
            .max(100, "El nombre no puede tener más de 100 caracteres"),
        description: Yup.string()
            .required("La descripción es requerida")
            .max(100, "La descripción no puede tener más de 100 caracteres"),
        companies: Yup.array()
            .min(1, "Debe seleccionar al menos una empresa")
            .required("Debe seleccionar al menos una empresa"),
        cronExpression: Yup.string().required("La hora de ejecución es requerida"),
    });

    const formik = useFormik<Task>({
        initialValues: {
            id: taskSelected.id,
            code: taskSelected.code,
            name: taskSelected.name,
            description: taskSelected.description,
            companies: taskSelected.companies || [],
            cronExpression: taskSelected.cronExpression && cronToTime(taskSelected.cronExpression),
            active: taskSelected.active,
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: handleSubmit,
    });

    function handleSubmit(task: Task) {
        const taskToSend: Task = {
            ...task,
            cronExpression: timeToCron(task.cronExpression),
        };
        action(taskToSend);
    }

    return (
        <Fragment>
            <form className="p-4 md:p-5" onSubmit={formik.handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <FormInputComponent
                        label="Código"
                        placeholder="Escriba el código de la tarea"
                        name="code"
                        value={formik.values.code}
                        error={formik.touched.code!! && Boolean(formik.errors.code)}
                        helperText={formik.touched.code && formik.errors.code}
                        onChange={formik.handleChange}
                    />
                    <FormInputComponent
                        label="Nombre"
                        placeholder="Escriba el nombre de la tarea"
                        name="name"
                        value={formik.values.name}
                        error={formik.touched.name!! && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        onChange={formik.handleChange}
                    />
                    <FormInputComponent
                        label="Descripción"
                        placeholder="Escriba la descripción de la tarea"
                        name="description"
                        value={formik.values.description}
                        error={formik.touched.description!! && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        onChange={formik.handleChange}
                    />
                    <FormMultiselect
                        label="Selecciona empresas"
                        options={companyOptions}
                        name="companies"
                        selected={formik.values.companies || []}
                        onChange={(values) => formik.setFieldValue("companies", values)}
                        onSearch={(value) => setSearch(value)}
                        error={formik.touched.companies && Boolean(formik.errors.companies)}
                        helperText={formik.touched.companies && formik.errors.companies}
                        isLoading={isLoadingCompanies}
                    />
                    <div className="col-span-2 sm:col-span-1">
                        <FormTimepickerComponent
                            label="Hora de ejecución"
                            placeholder="Especifique la hora de ejecución"
                            name="cronExpression"
                            id="cronExpressionId"
                            value={formik.values.cronExpression}
                            error={formik.touched.cronExpression!! && Boolean(formik.errors.cronExpression)}
                            helperText={formik.touched.cronExpression && formik.errors.cronExpression}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div className="col-span-2 sm:col-span-1 flex items-center mx-4">
                        <FormToggleComponent label="Activo" name="active" value={formik.values.active} onChange={formik.handleChange} />
                    </div>
                </div>

                <div className="mt-7">
                    <ButtonComponent label={label} type="submit" />
                </div>
            </form>
        </Fragment>
    );
};

export default FormCreateUpdateTask;
