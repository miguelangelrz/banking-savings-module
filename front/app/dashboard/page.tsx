import Link from 'next/link';

export default function Dashboard() {
  const savingsAccounts: Array<SavingsAccountPreview> = [
    { id: '1', lastFour: '3433', balance: 3424324, currency: 'COP' },
    { id: '2', lastFour: '3244', balance: 6543654, currency: 'EUR' },
    { id: '3', lastFour: '8790', balance: 0, currency: 'COP' },
    { id: '4', lastFour: '0545', balance: 5435, currency: 'USD' },
    { id: '5', lastFour: '0458', balance: 54665438, currency: 'COP' },
  ];

  return (
    <>
      <div className="flex justify-between">
        <h1>Mis productos financieros</h1>
        <Link href="/dashboard/request-product">Solicitar nueva cuenta</Link>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {savingsAccounts.map((p) => (
          <div key={p.id} className="bg-red-400 p-3 rounded">
            <div>**** **** **** {p.lastFour} </div>
            <div className="flex justify-end">
              {p.currency} {p.currency === 'EUR' && '€'}
              {p.currency !== 'EUR' && '$'}
              {p.balance}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
