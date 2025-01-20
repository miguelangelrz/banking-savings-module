import BaseInput from '@/components/BaseInput';
import Button from '@/components/Button';

export default function RequestProduct() {
  return (
    <div className="w-screen h-screen flex justify-center items-center p-2 bg-slate-200">
      <div className="w-full max-w-96 rounded shadow-sm bg-white shadow-black p-3 flex flex-col">
        <h1>Solicitar producto</h1>
        <BaseInput label="Tipo de moneda" />
        <Button variant="primary" className="mb-1 mt-5" fullWidth>
          Solicitar
        </Button>
        <Button variant="secondary" isLink href="/dashboard" fullWidth>
          Cancelar
        </Button>
      </div>
    </div>
  );
}
