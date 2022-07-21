import * as React from 'react';

type BaseInputRowProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange(value: string): void;
}

type InputRowProps = BaseInputRowProps & Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, keyof BaseInputRowProps>;

export const InputRow: React.FC<InputRowProps> = ({ placeholder, value, label, onChange, ...rest }) => {
  return (
    <div className="input-wrapper">
      <span style={{ width: 'auto' }} className="input-label" >{label}</span>
      <input
        {...rest}
        className=""
        value={value}
        placeholder={placeholder ?? label}
        onChange={(e) => onChange(e.target.value)}
        required={true}
      />
    </div>
  )
};  

