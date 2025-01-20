type SavingsAccountPreview = {
    id: string;
    lastFour: string;
    balance: number;
    currency: 'USD' | 'COP' | 'EUR';
}

type SavingsAccount = {
    id: string;
    accountNumber: string;
    balance: number;
    currency: 'USD' | 'COP' | 'EUR';
    createdAt: string;
    updatedAt: string;
}