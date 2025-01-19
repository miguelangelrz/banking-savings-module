interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function BaseInput(props: BaseInputProps) {
  const { label, ...inputProps } = props;
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input className="w-full py-2 px-3 border-gray-400 border-2" {...inputProps} />
    </div>
  );
}
