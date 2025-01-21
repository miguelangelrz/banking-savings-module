type SavingsAccountPreview = {
    id: string;
    alias?: string;
    lastFour: string;
    balance: number;
    currency: 'USD' | 'COP' | 'EUR';
}

type SavingsAccount = {
    accountNumber: string;
    accountType: 'savings' | 'current';
    alias?: string;
    balance: number;
    createdAt: string;
    currency: 'USD' | 'COP' | 'EUR';
    id: string;
    status: 'active' | 'inactive' | 'frozen';
    updatedAt: string;
}