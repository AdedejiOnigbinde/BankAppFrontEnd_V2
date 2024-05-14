export type transactionDto = {
    transType: string;
    transAmount: number;
    fromAcct: number;
    toAcct: number;
    transactionDate: string;
    balance: number;
    status: string;
}

export type accountDto = {
    accountNumber: number;
    ownerId: number;
    balance: number;
    accountType: string;
    calcLimit: number;
    dailyTransferLimit: number;
    accountStatus: string;
}

export type clientDto = {
    photoUrl: string;
    firstName: string;
    lastName: string;
    address: string;
}

export type beneficiaryDto = {
    beneficiaryId: number,
    bankAccountNumber: number;
    bank: string;
}

export type transferRequestDto = {
    toAcct: number;
    fromacct: number; 
    bank: string;
    amount: number;
    pin: number;
    addBeneficary: boolean;
}