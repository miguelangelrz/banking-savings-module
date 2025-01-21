import React from 'react';

interface BaseSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string | number; label: string }[];
}

export default function BaseSelect({ label, options, ...selectProps }: BaseSelectProps) {
  return (
    <div className="flex flex-col">
      <label>
        <span className="text-xs font-bold text-slate-700">{label}</span>
        <select className="w-full py-2 px-3 border-slate-600 border-2" {...selectProps}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
