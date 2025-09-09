export interface Task {
    id?: string;
    name: string;
    description: string;
    cronExpression: string;
    active: boolean;
}