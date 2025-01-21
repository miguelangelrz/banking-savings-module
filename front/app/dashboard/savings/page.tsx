'use client';

import Button from '@/components/Button';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Savings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Array<SavingsAccountPreview>>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const cookiesStr = document.cookie.split(';');
      const cookieTokenStr = cookiesStr.find((str) => {
        const [key] = str.split('=');
        return key === 'token';
      });
      if (!cookieTokenStr) {
        setError('No estás autorizado');
        return;
      }
      const [_, token] = cookieTokenStr?.split('=');
      if (!token) {
        setError('No estás autorizado');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/accounts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Error al cargar datos');
        }

        const data = await response.json();
        setAccounts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const goToSavingsAccount = (id: string) => {
    redirect(`/dashboard/savings/${id}`);
  };

  return (
    <>
      <h2>Mis productos financieros</h2>
      {loading && <div className="animate-spin w-5 h-5 bg-black mx-auto"></div>}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-2">
        {accounts.map((p) => {
          return (
            <div
              key={p._id}
              className="bg-slate-600 text-slate-100 p-3 rounded cursor-pointer"
              onClick={() => goToSavingsAccount(p._id)}
            >
              {p.alias && <div className="text-sm font-bold">{p.alias}</div>}
              <div>{p.accountNumber}</div>
              <div className="flex justify-end font-bold mt-2 text-sm">
                {p.currency} {p.currency === 'EUR' && '€'}
                {p.currency !== 'EUR' && '$'}
                {p.balance}
              </div>
            </div>
          );
        })}
      </div>
      <Button variant="secondary" className="mt-5" isLink href="/dashboard/savings/request">
        Solicitar nueva cuenta
      </Button>
    </>
  );
}
