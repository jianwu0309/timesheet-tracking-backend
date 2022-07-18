export interface ISaveRecord {
    id?: number;
    developerTime: string;
    developerTimezone: string;
    clientTime: string;
    clientTimezone: string;
    agencyTime: string;
    agencyTimezone: string;
    country: string;
}

export interface IGetRecords {
    limit: number;
    offset: number;
}