interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function BaseInput(props: BaseInputProps) {
  const { label, ...inputProps } = props;
  return (
    <div className="flex flex-col">
      <label>
        <span className="text-xs font-bold text-slate-700">{label}</span>

        <input className="w-full py-2 px-3 border-slate-600 border-2" {...inputProps} />
      </label>
    </div>
  );
}
