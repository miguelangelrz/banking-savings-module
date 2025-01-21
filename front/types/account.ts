type SavingsAccountPreview = {
  _id: string;
  alias?: string;
  accountNumber: string;
  balance: number;
  currency: 'USD' | 'COP' | 'EUR';
};

type SavingsAccount = {
  _id: string;
  alias?: string;
  accountNumber: string;
  balance: number;
  currency: 'USD' | 'COP' | 'EUR';
  createdAt: string;
};
