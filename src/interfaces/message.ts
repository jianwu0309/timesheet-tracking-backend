export interface ISaveMessageRequest {
    userId: number;
    messageId?: number;
    listingId: number;
    accountId: number;
    message: string;
}
