import BaseInput from '@/components/forms/BaseInput';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="p-3">
      <h1>Login</h1>
      <BaseInput label="email" />
      <BaseInput label="password" />
      <div>
        ¿No tienes cuenta?{' '}
        <Link href="/register" className="link">
          Crear una cuenta
        </Link>{' '}
      </div>
    </div>
  );
}
