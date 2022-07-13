export interface IUserUpdateRequest {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    companyName: string;
    companySizeId: number;
    position: string;
    cityId: number;
}

export interface IUserMeResponse {
    name: string;
    email: string;
    phoneNumber: string;
    companyName: string;
    companySizeId: number;
    position: string;
    cityId: number;
    isSubscribed: boolean;
    preferences: number[];
}
