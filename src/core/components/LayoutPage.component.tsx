import { Fragment } from "react";

interface LayoutPageProps {
    children: React.ReactNode;
}

export const LayoutPage = (props: LayoutPageProps) => {
    return (
        <Fragment>
            <div className="bg-white flex p-6 shadow-sm">Scheduler Automation</div>
            <div className="flex flex-row min-h-screen">
                <div className="p-6 w-60 border-r border-gray-200 shadow-sm">
                    <h6 className="mb-4 font-bold">Opciones</h6>
                    <ul>
                        <a href="/tasking">
                            <li className="flex mb-1 group/item items-center p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200">
                                <div className="bg-white shadow-sm p-2 mr-3 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                                    </svg>
                                </div>
                                <span className="self-center">Tareas</span>
                            </li>
                        </a>
                        <a href="/history">
                            <li className="flex mb-1 items-center p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200">
                                <div className="bg-white shadow-sm p-2 mr-3 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                    </svg>
                                </div>
                                <span className="self-center">Historico</span>
                            </li>
                        </a>
                    </ul>
                </div>
                <div className="flex-1 p-6 overflow-auto">{props.children}</div>
            </div>
        </Fragment>
    );
};