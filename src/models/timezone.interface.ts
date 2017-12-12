export interface timezone {
    id: string;
    value: string,
    abbr: string,
    offset: number,
    isdst: boolean,
    location: string,
    utc?: string
}