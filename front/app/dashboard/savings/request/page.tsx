'use client';

import BaseInput from '@/components/BaseInput';
import BaseSelect from '@/components/BaseSelect';
import Button from '@/components/Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RequestProduct() {
  const currencyOptions = [
    { value: 'COP', label: 'Peso colombiano' },
    { value: 'USD', label: 'Dolares' },
    { value: 'EUR', label: 'Euro' },
  ];
  const accountType = [
    { value: 'savings', label: 'Ahorros' },
    { value: 'current', label: 'Corriente' },
  ];

  const router = useRouter()
  const [alias, setAlias] = useState('');
  const [type, setType] = useState('savings');
  const [currency, setCurrency] = useState('COP');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  const handleSubmit = async () => {
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
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currency: currency,
          alias: alias.length ? alias : undefined,
          accountType: type,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al cargar datos');
      }

      await response.json();
      router.push('/dashboard/savings');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Solicitar producto</h2>
      <BaseInput label="Alias" value={alias} onChange={(e) => setAlias(e.target.value)} />
      <BaseSelect
        options={currencyOptions}
        label="Tipo de moneda"
        onChange={(e) => setCurrency(e.target.value)}
      />
      <BaseSelect
        options={accountType}
        label="Tipo de cuenta"
        onChange={(e) => setType(e.target.value)}
      />

      {error && (
        <div className="rounded mt-2 p-2 bg-red-100 text-red-800 text-sm font-bold">
          Error: {error}
        </div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={loading}
        variant="primary"
        className="mb-1 mt-5"
        fullWidth
      >
        Solicitar
      </Button>
      <Button variant="secondary" isLink href="/dashboard" fullWidth>
        Cancelar
      </Button>
    </>
  );
}
