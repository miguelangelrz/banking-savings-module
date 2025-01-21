import Button from '@/components/Button';
import { transformDateText } from '@/utils/date';
import Link from 'next/link';

type SavingsAccountDetailParams = {
  params: Promise<{ id: string }>;
};

export default async function SavingsAccountDetail({ params }: SavingsAccountDetailParams) {
  const id = (await params).id;
  const data: SavingsAccount = {
    id: id,
    accountNumber: '0123456789012345',
    currency: 'USD',
    balance: 1000.0,
    accountType: 'savings',
    status: 'active',
    createdAt: '2025-01-19T10:15:30Z',
    updatedAt: '2025-01-20T14:25:43Z',
  };
  return (
    <div>
      <div className="bg-slate-200 text-xs p-1 mb-2">
        <Link href="/dashboard/savings" className="link">
          {'<'} Volver a mis cuentas{' '}
        </Link>
      </div>
      <h2>Cuenta {data.accountNumber}</h2>
      <div className="flex justify-between">
        <span>Moneda</span>
        <span>{data.currency}</span>
      </div>
      <div className="flex justify-between">
        <span>Balance</span>
        <span>
          {data.currency === 'EUR' && '€'}
          {data.currency !== 'EUR' && '$'}
          {data.balance}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Fecha apertura</span>
        <span>{transformDateText(data.createdAt)}</span>
      </div>
      <Button variant="danger" className="mt-5" fullWidth>
        Eliminar cuenta
      </Button>
    </div>
  );
}
