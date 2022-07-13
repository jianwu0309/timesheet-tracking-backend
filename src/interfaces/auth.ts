export interface ILoginRequest {
    email: string;
    password: string;
    deviceId: string;
}

export interface ISignUpRequest {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    companyName: string;
    companySizeId: number;
    position: string;
    cityId: string;
    timezone: string;
}

export interface IAuthResponse {
    id: number;
    firstName: string;
    lastName?: string;
    email: string;
    phoneNumber: string;
    isApproved: boolean;
    accessToken: string;
    isAdmin: boolean;
    isEmailVerified: boolean;
    accountId?: number;
    city?: any;
}

export interface IResetPassword {
    email: string;
    password: string;
    hash: string;
}

export interface IChangePassword {
    oldPassword: string;
    password: string;
}
