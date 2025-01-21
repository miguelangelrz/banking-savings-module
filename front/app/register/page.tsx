'use client';

import BaseInput from '@/components/BaseInput';
import BaseSelect from '@/components/BaseSelect';
import Button from '@/components/Button';
import { fetchWithAuth } from '@/utils/fetchWithAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Register() {
  const documentTypes = [
    { value: 'CC', label: 'Cédula' },
    { value: 'CE', label: 'Cédula extranjera' },
    { value: 'TI', label: 'Tarjeta de identidad' },
  ];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState<string>('');
  const [documentType, setDocumentType] = useState('CC');
  const [documentNumber, setDocumentNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const data = {
      name,
      documentType,
      documentNumber,
      password,
    };

    try {
      const result = await fetch(`http://localhost:3000/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });


      router.push('/login');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Registro</h2>
      <form>
        <BaseInput label="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
        <BaseSelect
          options={documentTypes}
          label="Tipo de documento"
          onChange={(e) => setDocumentType(e.target.value)}
        />
        <BaseInput
          label="Número de documento"
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
        />
        <BaseInput
          type="password"
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <div className="rounded mt-2 p-2 bg-red-100 text-red-800 text-sm font-bold">
            Error: {error}
          </div>
        )}
        <Button
          variant="primary"
          disabled={loading}
          className="mt-5"
          type="submit"
          onClick={handleSubmit}
          fullWidth
        >
          Registrarse
        </Button>
      </form>
      <div>
        ¿Ya tienes una cuenta?{' '}
        <Link href="/login" className="link">
          Ingresar a tu cuenta
        </Link>{' '}
      </div>
    </>
  );
}
