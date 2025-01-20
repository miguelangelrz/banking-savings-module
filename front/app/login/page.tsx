import BaseInput from '@/components/BaseInput';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="p-3">
      <h1>Login</h1>
      <form>
        <BaseInput label="Correo" />
        <BaseInput label="Contraseña" />
        <button type="submit">Ingresar</button>
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
