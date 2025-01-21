'use client';

import Button from '@/components/Button';
import { transformDateText } from '@/utils/date';
import { fetchWithAuth } from '@/utils/fetchWithAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type SavingsAccountDetailParams = {
  params: Promise<{ id: string }>;
};

export default function SavingsAccountDetail({ params }: SavingsAccountDetailParams) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<SavingsAccount>();

  const [deleting, setDeleting] = useState(false);
  const [deletingError, setDeletingError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const id = (await params).id;
        const data = await fetchWithAuth(`http://localhost:3000/accounts/${id}`);
        setAccount(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    setDeletingError(null);

    try {
      const id = (await params).id;
      await fetchWithAuth(`http://localhost:3000/accounts/${id}`, {
        method: 'DELETE',
      });

      router.push('/dashboard');
    } catch (err) {
      setDeletingError((err as Error).message);
    } finally {
      setDeleting(false);
    }
  };

  if (!account) return <></>;

  if (error)
    return (
      <div className="p-3">
        <div className="rounded mt-2 p-2 bg-red-100 text-red-800 text-sm font-bold">
          Error: {error}
        </div>
      </div>
    );

  return (
    <div>
      <div className="bg-slate-200 text-xs p-1 mb-2">
        <Link href="/dashboard/savings" className="link">
          {'<'} Volver a mis cuentas{' '}
        </Link>
      </div>
      {loading && <div className="animate-spin w-5 h-5 bg-black mx-auto"></div>}
      <h2>Cuenta {account.accountNumber}</h2>
      <div className="flex justify-between">
        <span>Moneda</span>
        <span>{account.currency}</span>
      </div>
      <div className="flex justify-between">
        <span>Balance</span>
        <span>
          {account.currency === 'EUR' && '€'}
          {account.currency !== 'EUR' && '$'}
          {account.balance}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Fecha apertura</span>
        <span>{transformDateText(account.createdAt)}</span>
      </div>

      {deletingError && (
        <div className="rounded mt-2 p-2 bg-red-100 text-red-800 text-sm font-bold">
          Error: {deletingError}
        </div>
      )}

      <Button
        onClick={handleDelete}
        disabled={deleting}
        variant="danger"
        className="mt-5"
        fullWidth
      >
        Eliminar cuenta
      </Button>
    </div>
  );
}
