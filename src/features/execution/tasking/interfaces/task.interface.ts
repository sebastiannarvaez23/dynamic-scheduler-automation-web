export interface Task {
    id?: string;
    name: string;
    description: string;
    cronExpresion: string;
    active: boolean;
}