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