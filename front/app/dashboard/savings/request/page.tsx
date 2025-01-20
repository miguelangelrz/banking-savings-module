import BaseInput from '@/components/BaseInput';
import Button from '@/components/Button';

export default function RequestProduct() {
  return (
    <>
      <h2>Solicitar producto</h2>
      <BaseInput label="Tipo de moneda" />
      <Button variant="primary" className="mb-1 mt-5" fullWidth>
        Solicitar
      </Button>
      <Button variant="secondary" isLink href="/dashboard" fullWidth>
        Cancelar
      </Button>
    </>
  );
}

