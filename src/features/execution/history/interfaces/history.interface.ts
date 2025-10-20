import type { Company } from "../../company/interfaces/company.interface";
import type { Task } from "../../task/interfaces/task.interface";

export interface History {
    id?: string;
    task: Task;
    executionDate: Date | string;
    executionHour: string;
    executionTime: string;
    status: string;
    company: Company;
}