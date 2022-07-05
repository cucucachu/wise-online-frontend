import * as React from 'react';
type InputRowProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange(value: string): void;
}

export const InputRow: React.FC<InputRowProps> = ({ placeholder, value, label, onChange }) => {
  return (
    <div className="input-wrapper">
      <span style={{ width: 'auto' }} className="input-label" >{label}</span>
      <input
        className=""
        value={value}
        placeholder={placeholder ?? label}
        onChange={(e) => onChange(e.target.value)}
        required={true}
      />
    </div>
  )
};  

