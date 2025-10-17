export interface Header {
    label: string | undefined;
    field: string;
    filter: boolean;
    typeFilter: 'input' | 'toggle' | 'select' | 'time' | 'date' | undefined;
    format: 'text' | 'hour' | 'date' | 'duration' | undefined;
}