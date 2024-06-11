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

export type depositRequestDto = {
    depositRequestId: number;
    checkNumber: string;
    checkBank: string;
    checkAmount: number;
    description: string;
    status: string;
    requestDate: string;
    splitCheckingAmount: number;
    splitSavingsAmount: number;
}

export type depositRequestPayload = {
    checkNumber: number;
    checkBank: string;
    checkAmount: number;
    description?: string;
    splitCheckingAmount?: number;
    splitSavingsAmount?: number;
}