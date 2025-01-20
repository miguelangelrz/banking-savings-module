import BaseInput from '@/components/BaseInput';
import Button from '@/components/Button';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="p-3">
      <h2>Ingreso</h2>
      <form>
        <BaseInput label="Correo" />
        <BaseInput label="Contraseña" />
        <Button variant="primary" className="mt-5" type="submit" fullWidth>
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
