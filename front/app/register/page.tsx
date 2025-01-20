import BaseInput from '@/components/BaseInput';
import Link from 'next/link';

export default function Register() {
  return (
    <>
      <h1>Register</h1>
      <BaseInput label="Nombre" />
      <BaseInput label="Tipo de documento" />
      <BaseInput label="Número de documento" />
      <BaseInput label="Número de teléfono" />
      <BaseInput label="Correo" />
      <BaseInput label="Contraseña" />
      <div>
        ¿Ya tienes una cuenta?{' '}
        <Link href="/login" className="link">
          Ingresar a tu cuenta
        </Link>{' '}
      </div>
    </>
  );
}
