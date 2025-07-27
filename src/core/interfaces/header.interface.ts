export interface Header {
    label: string | null;
    typeFilter: 'input' | 'toggle' | 'select' | 'time' | null;
}