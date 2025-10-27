import type { Option as OptionCombobox } from "../components/ComboboxDbounce.component";
import type { Option as OptionSelect } from "../components/Select.componet";

export interface Header {
    label: string | undefined;
    field: string;
    filter: boolean;
    typeFilter: 'input' | 'toggle' | 'select' | 'time' | 'date' | 'combobox' | undefined;
    format: 'text' | 'hour' | 'date' | 'duration' | undefined;
    options?: OptionSelect[] | OptionCombobox[];
    load?: {
        loading: string;
        complete: string;
        fail: string;
    }
    extra?: any;
}