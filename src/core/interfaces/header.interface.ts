export interface Header {
    label: string | undefined;
    field: string | undefined;
    filter: boolean;
    typeFilter: 'input' | 'toggle' | 'select' | 'time' | 'date' | undefined;
}