export interface Student {
    id: number;
    indexYear: number;
    firstName: string;
    lastName: string;
    email?: string | null | undefined;
    address?: string | null | undefined;
    postalCode?: number | null | undefined;
    currentYearOfStudy: number;
}