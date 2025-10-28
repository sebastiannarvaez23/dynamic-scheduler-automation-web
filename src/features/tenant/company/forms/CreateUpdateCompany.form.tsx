import { Fragment } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import ButtonComponent from "../../../../core/components/Button.component";
import FormInputComponent from '../../../../core/components/FormInput.component';
import FormToggleComponent from "../../../../core/components/FormToggle.component";
import useCompany from "../hooks/useCompany.hook";

import type { Company } from "../interfaces/company.interface";

interface FormCreateUpdateCompanyProps {
    label: string;
    action: (data: Company) => void;
}

const FormCreateUpdateCompany = (props: FormCreateUpdateCompanyProps) => {

    const { companySelected } = useCompany();

    const validationSchema = Yup.object({
        nit: Yup.string()
            .required("El nit es requerido")
            .max(10, "El nit no puede tener más de 10 caracteres"),
        name: Yup.string()
            .required("El nombre es requerido")
            .max(100, "El nombre no puede tener más de 100 caracteres"),
        description: Yup.string()
            .required("La descripción es requerida")
            .max(100, "La descripción no puede tener más de 100 caracteres"),
    });

    const formik = useFormik<Company>({
        initialValues: {
            id: companySelected.id,
            nit: companySelected.nit,
            name: companySelected.name,
            description: companySelected.description,
            active: companySelected.active
        },
        validationSchema,
        onSubmit: (values) => handleSubmit(values)
    });

    const handleSubmit = async (company: Company) => {
        console.log("ejecutando")
        props.action({ ...company });
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
                        <FormInputComponent
                            label="NIT"
                            placeholder="Escriba nit de la empresa"
                            name="nit"
                            value={formik.values.nit}
                            error={formik.touched.nit!! && Boolean(formik.errors.nit)}
                            helperText={formik.touched.nit && formik.errors.nit}
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
                    <ButtonComponent label={props.label} type="submit" />
                </div>
            </form>
        </Fragment>
    );
}

export default FormCreateUpdateCompany;