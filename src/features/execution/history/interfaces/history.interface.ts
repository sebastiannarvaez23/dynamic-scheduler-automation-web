import type { Task } from "../../task/interfaces/task.interface";

export interface History {
    id?: string;
    task: Task;
    executionDate: Date;
    executionHour: string;
    executionTime: string;
    status: string;
}