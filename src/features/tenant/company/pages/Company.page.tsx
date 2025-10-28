import { Fragment } from "react";

import { LayoutPage } from "../../../../core/components/LayoutPage.component";
import { TitlePage } from "../../../../core/components/TitlePage.component";
import ButtonComponent from "../../../../core/components/Button.component";
import FormCreateUpdateCompany from "../forms/CreateUpdateCompany.form";
import ModalComponent from '../../../../core/components/Modal.component';
import TableComponent from "../../../../core/components/Table.component";
import useCompany from "../hooks/useCompany.hook";

import type { Header } from "../../../../core/interfaces/header.interface";
import type { Company } from "../interfaces/company.interface";


const CompanyPage = () => {

    const headers: Header[] = [
        { label: 'nit', field: "nit", typeFilter: 'input', filter: true, format: 'text' },
        { label: 'Nombre', field: "name", typeFilter: 'input', filter: true, format: 'text' },
        { label: 'Descripción', field: "description", typeFilter: 'input', filter: true, format: 'text' },
        { label: 'Activo', field: "active", typeFilter: 'toggle', filter: true, format: undefined },
        { label: undefined, field: "", typeFilter: undefined, filter: true, format: undefined },
        { label: undefined, field: "", typeFilter: undefined, filter: true, format: undefined },
    ];

    const {
        companies,
        count,
        filters,
        page,
        modalCreate,
        modalUpdate,
        isLoadingCompanySelected,
        setModalCreate,
        setModalUpdate,
        handleSetFilters,
        handleCreateCompany,
        handleGetCompanys,
        handleGetCompany,
        handleUpdateCompany,
        handleCleanFilters,
        handleSetEmptyCompanySelected,
        handleDeleteCompany,
    } = useCompany();

    const handlePreUpdate = (id: string) => {
        setModalUpdate(true);
        handleGetCompany(id);
    }

    const handlePreCreate = () => {
        setModalCreate(true);
        handleSetEmptyCompanySelected();
    }

    return (
        <Fragment>
            <LayoutPage>
                <TitlePage title="Empresas" />
                <ModalComponent
                    title={"Crear empresa"}
                    open={modalCreate}
                    setOpen={setModalCreate}>
                    <FormCreateUpdateCompany
                        label="+ Añadir nueva empresa"
                        action={(company: Company) => handleCreateCompany(company, 0)} />
                </ModalComponent>
                <ModalComponent
                    title={"Editar empresa"}
                    open={!isLoadingCompanySelected && modalUpdate}
                    setOpen={setModalUpdate}>
                    <FormCreateUpdateCompany
                        label="Editar empresa"
                        action={(company: Company) => handleUpdateCompany(company, page)} />
                </ModalComponent>
                <div className="w-full my-5 px-10 text-right">
                    <ButtonComponent
                        label="Limpiar filtros"
                        type="button"
                        action={handleCleanFilters} />
                    <ButtonComponent
                        label="Crear empresa"
                        type="button"
                        action={handlePreCreate} />
                </div>
                <div>
                    <TableComponent
                        headers={headers}
                        data={companies}
                        totalElements={count}
                        filters={filters}
                        handlePreUpdate={handlePreUpdate}
                        handleGetElements={handleGetCompanys}
                        handleSetFilters={handleSetFilters}
                        handleDelete={handleDeleteCompany} />
                </div>
            </LayoutPage>
        </Fragment>
    );
}

export default CompanyPage;