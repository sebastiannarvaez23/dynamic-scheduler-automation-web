export interface Header {
    label: string | null;
    filter: boolean;
    typeFilter: 'input' | 'toggle' | 'select' | 'time' | 'date' | null;
}