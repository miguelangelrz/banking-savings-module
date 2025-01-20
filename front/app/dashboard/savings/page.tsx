'use client';

import Button from '@/components/Button';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactElement } from 'react';

export default function Savings() {
  const savingsAccounts: Array<SavingsAccountPreview> = [
    { id: '1', lastFour: '3433', balance: 3424324, currency: 'COP' },
    { id: '2', lastFour: '3244', balance: 6543654, currency: 'EUR' },
    { id: '3', lastFour: '8790', balance: 0, currency: 'COP' },
    { id: '4', lastFour: '0545', balance: 5435, currency: 'USD' },
    { id: '5', lastFour: '0458', balance: 54665438, currency: 'COP' },
  ];

  const goToSavingsAccount = (id: string) => {
    redirect(`/dashboard/savings/${id}`);
  };

  return (
    <>
      <h2>Mis productos financieros</h2>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-2">
        {savingsAccounts.map((p) => (
          <div
            key={p.id}
            className="bg-slate-600 text-slate-100 p-3 rounded cursor-pointer"
            onClick={() => goToSavingsAccount(p.id)}
          >
            <div>**** **** **** {p.lastFour} </div>
            <div className="flex justify-end font-bold mt-2 text-sm">
              {p.currency} {p.currency === 'EUR' && '€'}
              {p.currency !== 'EUR' && '$'}
              {p.balance}
            </div>
          </div>
        ))}
      </div>
      <Button variant="secondary" className="mt-5" isLink href="/dashboard/savings/request">
        Solicitar nueva cuenta
      </Button>
    </>
  );
}
