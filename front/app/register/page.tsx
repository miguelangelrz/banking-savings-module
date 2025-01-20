import BaseInput from '@/components/BaseInput';
import Button from '@/components/Button';
import Link from 'next/link';

export default function Register() {
  return (
    <>
      <h2>Registro</h2>
      <form>
        <BaseInput label="Nombre" />
        <BaseInput label="Tipo de documento" />
        <BaseInput label="Número de documento" />
        <BaseInput label="Número de teléfono" />
        <BaseInput label="Correo" />
        <BaseInput label="Contraseña" />
        <Button variant="primary" className="mt-5" type="submit" fullWidth>
          Ingresar
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
