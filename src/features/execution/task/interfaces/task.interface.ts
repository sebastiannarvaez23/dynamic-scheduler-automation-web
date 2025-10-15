export interface Task {
    id?: string;
    code: string;
    name: string;
    description: string;
    cronExpression: string;
    active: boolean;
    companies: string[];
}