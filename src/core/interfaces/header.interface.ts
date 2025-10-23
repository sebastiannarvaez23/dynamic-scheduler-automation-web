import type { Option } from "../components/Select.componet";

export interface Header {
    label: string | undefined;
    field: string;
    filter: boolean;
    typeFilter: 'input' | 'toggle' | 'select' | 'time' | 'date' | undefined;
    format: 'text' | 'hour' | 'date' | 'duration' | undefined;
    options?: Option[];
    load?: {
        loading: string;
        complete: string;
        fail: string;
    }
}