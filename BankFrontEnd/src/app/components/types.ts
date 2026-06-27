export type loginResponse = {
    role: string;
}

export type loginFormData = {
    userName: string;
    password: string;
}

export type registerFormData = {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    address: string;
    pinNumber: number;
    ssn: number;
}