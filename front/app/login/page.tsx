'use client'

import BaseInput from '@/components/BaseInput';
import BaseSelect from '@/components/BaseSelect';
import Button from '@/components/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const documentTypes = [
    { value: 'CC', label: 'Cédula' },
    { value: 'CE', label: 'Cédula extranjera' },
    { value: 'TI', label: 'Tarjeta de identidad' },
  ];

  const [documentType, setDocumentType] = useState('CC');
  const [documentNumber, setDocumentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentType, documentNumber, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      const data = await response.json();
      document.cookie = `token=${data.auth_token}; path=/; max-age=604800`;
      router.push('/dashboard'); 
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3">
      <h2>Ingreso</h2>
      <form onSubmit={handleSubmit}>
        <BaseSelect
          label="Tipo de documento"
          options={documentTypes}
          onChange={(e) => setDocumentType(e.target.value)}
        />
        <BaseInput
          label="Número de identificación"
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
        />
        <BaseInput
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="rounded mt-2 p-2 bg-red-100 text-red-800 text-sm font-bold">Error: {error}</div>}
        <Button variant="primary" disabled={loading} className="mt-5" type="submit" fullWidth>
          Ingresar
        </Button>
      </form>
      <div>
        ¿No tienes cuenta?{' '}
        <Link href="/register" className="link">
          Crear una cuenta
        </Link>{' '}
      </div>
    </div>
  );
}
